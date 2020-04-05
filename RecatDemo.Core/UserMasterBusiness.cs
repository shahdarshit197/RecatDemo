using RecatDemo.Business.Models;
using RecatDemo.Services;
using System.Collections.Generic;
using System.Linq;

namespace RecatDemo.Core
{
    public class UserMasterBusiness : IUserMaster
    {
        TestAppContext db = new TestAppContext();
        public int InsertUser(string email, string FullName, string mobileno)
        {
            UserMaster um = new UserMaster();
            um.EmailId = email;
            um.FullName = FullName;
            um.MobileNo = mobileno;
            db.UserMaster.Add(um);
            db.SaveChanges();
            return um.Id;
        }
        public void UpdatedUser(int id, string email, string FullName, string mobileno)
        {
            var um = db.UserMaster.FirstOrDefault(a => a.Id == id);
            if (um != null)
            {
                um.EmailId = email;
                um.FullName = FullName;
                um.MobileNo = mobileno;
                
                db.SaveChanges();
            }
        }
        public List<UserMaster> GetUser()
        {
            return db.UserMaster.ToList();
        }
        public UserMaster GetUser(int id)
        {
            return db.UserMaster.FirstOrDefault(a => a.Id == id);
        }
        public void Deleteuser(int id)
        {
            var usr = db.UserMaster.FirstOrDefault(a => a.Id == id);
            if (usr != null)
            {
                db.UserMaster.Remove(usr);
                db.SaveChanges();
            }
        }
        
    }
}
