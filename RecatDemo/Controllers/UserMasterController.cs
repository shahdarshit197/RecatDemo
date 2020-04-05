using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RecatDemo.Models;
using RecatDemo.Services;
using System;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RecatDemo.Controllers
{

    public class UserMasterController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserMaster _user;

        public UserMasterController(IUserMaster user,IMapper mapper)
        {
            _user = user;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<UserMasterModel> Index()
        {
            var model = _mapper.Map<List<UserMasterModel>>(_user.GetUser());
            return model;
        }
        [HttpPost]
        public int AddUser(UserMasterModel model)
        {
            try
            {

                return _user.InsertUser(model.EmailId, model.FullName, model.MobileNo);
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int UpdateUser(UserMasterModel model)
        {
            try
            {
                _user.UpdatedUser(model.Id, model.EmailId, model.FullName, model.MobileNo);
                return model.Id;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public UserMasterModel GetUser(int id)
        {
            try
            {
                return _mapper.Map<UserMasterModel>(_user.GetUser(id));
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public int DeleteUser(int id)
        {
            try
            {
                _user.Deleteuser(id);
                return id;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

    }
}
