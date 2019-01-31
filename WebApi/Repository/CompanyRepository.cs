using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Models;

namespace WebApi.Repository
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly IDbContext _context;

        public CompanyRepository(IDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Company>> GetAllCompanies()
        {
            return await _context
                        .Companies
                        .Find(_ => true)
                        .ToListAsync();
        }

        public Task<Company> GetCompany(long id)
        {
            FilterDefinition<Company> filter =
                Builders<Company>.Filter.Eq(c => c.CompanyID, id);

            return _context
                    .Companies
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }

        public async Task Create(Company company)
        {
            await _context.Companies.InsertOneAsync(company);
        }

        public async Task<bool> Delete(long id)
        {
            FilterDefinition<Company> filter =
                Builders<Company>.Filter.Eq(c => c.CompanyID, id);

            DeleteResult deleteResult = await _context
                                            .Companies
                                            .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged &&
                deleteResult.DeletedCount < 0;
        }

        public async Task<bool> Update(Company company)
        {
            ReplaceOneResult replace =
                await _context.Companies.ReplaceOneAsync(
                    filter: c => c.CompanyID == company.CompanyID,
                    replacement: company);

            return replace.IsAcknowledged &&
                replace.ModifiedCount < 0;
        }
    }
}
