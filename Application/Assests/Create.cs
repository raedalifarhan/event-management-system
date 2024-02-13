using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Assests
{
    public class Create
    {
        public class Command : IRequest<Result<string>>
        {
            public UploadFileDto? model { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<string>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var fileName = request?.model?.File.FileName;

                var fileExtension = Path.GetExtension(fileName);

                var validFileExtensions = new string[] { ".pdf" };
                var validImageExtensions = new string[] { ".jpeg", ".gif", ".png", ".jpg" };

                var isImage = validImageExtensions.Contains(fileExtension);
                var isFile = validFileExtensions.Contains(fileExtension);

                if (isImage)
                    return Result<string>.Success(
                        await SaveFileToServerAndDatabase(request?.model!, fileName!, true));
                else if (isFile)
                    return Result<string>.Success(
                        await SaveFileToServerAndDatabase(request?.model!, fileName!, false));
                else
                    return Result<string>.Failure("File extension not valid.");
            }

            private async Task<string> SaveFileToServerAndDatabase(UploadFileDto model, string fileName, bool isImage)
            {
                var fileDbUrl = DateTime.Now.ToString("yyyyMMddhhmmss") + fileName;

                var folderPath = "";
                if (isImage)
                    folderPath = Path.Combine("wwwroot", "images");
                if (!isImage)
                    folderPath = Path.Combine("wwwroot", "files");

                var fileServerPath = Path.Combine(folderPath, fileDbUrl);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                using (var stream = new FileStream(fileServerPath, FileMode.Create))
                {
                    await model.File.CopyToAsync(stream);
                }

                var comp = await _context.Companies
                    .Include(x => x.LicenceDetails)
                    .FirstOrDefaultAsync(x => x.Id == model.Id);

                if (comp != null)
                {
                    if (isImage)
                    {
                        // delete old file
                        if (!string.IsNullOrEmpty(comp.ImageUrl))
                        {
                            var oldFilePath = Path.Combine(folderPath, comp.ImageUrl);
                            System.IO.File.Delete(oldFilePath);
                        }

                        comp.ImageUrl = fileDbUrl;
                    }
                    else
                    {
                        // delete old file
                        if (!string.IsNullOrEmpty(comp.FileUrl))
                        {
                            var oldFilePath = Path.Combine(folderPath, comp.FileUrl);
                            System.IO.File.Delete(oldFilePath);
                        }

                        comp.FileUrl = fileDbUrl;
                    }

                    comp.FileName = fileName;

                    await _context.SaveChangesAsync();
                }

                return fileServerPath;
            }
        }
    }
}
