using API.Services;
using Application.Core;
using Application.Events;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

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
           

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddMediatR(typeof(List.Handler));
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            //services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped(typeof(IAuthService), typeof(AuthService));

            return services;
        }
    }
}