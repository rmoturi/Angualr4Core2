using BusinessLibrary;
using BusinessLibrary.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Angular4Core2.Controllers
{
    public class ContactController : Controller
    {
        public IContactRepository ContactRepo;

        public ContactController(IContactRepository contactRepo)
        {
            ContactRepo = contactRepo;
        }

        [HttpGet, Produces("application/json")]
        public async Task<IActionResult> GetContacts()
        {
            var data = await ContactRepo.GetAllContact();
            return Json(new { result = data });
        }

        [HttpPost, Produces("application/json")]
        public async Task<IActionResult> SaveContact([FromBody] Contact model)
        {
            return Json(await ContactRepo.SaveContact(model));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteContactByID(int id)
        {
            return Json(await ContactRepo.DeleteContactByID(id));
        }

    }
}