
using System.Text;
using API.Services;
using App.Helpers;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence.Data;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddIdentityServices (this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt => {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<DataContext>();
            //.AddDefaultTokenProviders();

            services.AddAuthentication();
            services.Configure<JWT>(config.GetSection("JWT"));
            services.AddScoped<AuthService>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Key"]!));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });


            // services.AddCors(opt => {
            //     opt.AddPolicy("CorsPolicy", policy => {
            //         policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:4200/");
            //     });
            // });
            
            return services;
        }
    }
}