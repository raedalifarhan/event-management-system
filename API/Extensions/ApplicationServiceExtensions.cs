using API.Services;
using Application.Companies;
using Application.Core;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(option =>
            {
                option.UseSqlServer(config.GetConnectionString("DefConn"));
            });           

            services.AddAutoMapper(typeof(CompanyMappingProfiles).Assembly);
            services.AddAutoMapper(typeof(BranchMappingProfiles).Assembly);
            services.AddAutoMapper(typeof(LicenceMappingProfiles).Assembly);

            services.AddMediatR(typeof(List.Handler));
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            services.AddScoped(typeof(IAuthService), typeof(AuthService));

            return services;
        }
    }
}