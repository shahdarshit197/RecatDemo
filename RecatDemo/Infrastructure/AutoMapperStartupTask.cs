using AutoMapper;
using RecatDemo.Business.Models;
using RecatDemo.Models;

namespace RecatDemo.Infrastructure
{
    public class AutoMapperStartupTask : Profile
    {
        public AutoMapperStartupTask()
        {
            CreateMap<UserMaster, UserMasterModel>();
        }
    }
}
