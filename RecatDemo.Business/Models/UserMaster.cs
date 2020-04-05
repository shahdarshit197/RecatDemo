using System;
using System.Collections.Generic;

namespace RecatDemo.Business.Models
{
    public partial class UserMaster
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
    }
}
