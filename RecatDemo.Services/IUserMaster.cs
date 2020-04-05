using RecatDemo.Business.Models;
using System.Collections.Generic;

namespace RecatDemo.Services
{
    public interface IUserMaster
    {
        int InsertUser(string email, string FullName, string mobileno);
        void UpdatedUser(int id, string email, string FullName, string mobileno);
        List<UserMaster> GetUser();
        UserMaster GetUser(int id);
        void Deleteuser(int id);
    }
}
