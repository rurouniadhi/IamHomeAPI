namespace IamHome.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using IamHome.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<IamHome.Models.IamHomeContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(IamHome.Models.IamHomeContext context)
        {
            context.Users.AddOrUpdate(x => x.Id,
                new User() { Id = 1, Name = "Jane Austen", PhoneNumber = 123, Email = "a@a.com", Status = true },
                new User() { Id = 2, Name = "Charles Dickens", PhoneNumber = 456, Email = "b@b.com", Status = true },
                new User() { Id = 3, Name = "Miguel de Cervantes", PhoneNumber = 789, Email = "c@c.com", Status = false }
            );

        }
    }
}
