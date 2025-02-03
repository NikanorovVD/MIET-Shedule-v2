﻿using ServiceLayer.Services;
using DataLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ServiceLayer.Services.Parsing;

namespace ParseShedule
{
    public class Program
    {
        static async Task Main(string[] args)
        {
            string workingDirectory = Environment.CurrentDirectory;

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetParent(workingDirectory).Parent.Parent.Parent.FullName)
                .AddJsonFile("MietShedule.Server/appsettings.Development.json", optional: false);

            string path = AppContext.BaseDirectory;
            IConfiguration Configuration = builder.Build();

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));

            SheduleInitializerService sheduleInitializerService = new SheduleInitializerService(
                adapterService: new MietSheduleAdapterService(),
                parserService: new SheduleParserService(new HttpClient()),
                appDbContext: new AppDbContext(optionsBuilder.Options)
                );

            await sheduleInitializerService.CreateShedule();
            Console.WriteLine("SheduleParser: Done");
        }
    }
}
