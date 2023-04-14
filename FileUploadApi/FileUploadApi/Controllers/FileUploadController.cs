using Microsoft.AspNetCore.Mvc;
using System.Drawing;

namespace FileUploadApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostEnvironment;

        public FileUploadController(IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<object>> Upload(IFormFileCollection files)
        {
            if (files == null || files.Count == 0)
            {
                return BadRequest("No files found.");
            }

            string uploadsFolderPath = Path.Combine(_hostEnvironment.ContentRootPath, "Uploads");

            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            foreach (IFormFile file in files)
            {
                if (file.Length > 0)
                {
                    //string filePath = Path.Combine(uploadsFolderPath, file.FileName);

                    //using FileStream stream = new(filePath, FileMode.Create);
                    //await file.CopyToAsync(stream);
                }
            }

            return Ok(new { count = files.Count });
        }

        [HttpPost]
        public async Task<IActionResult> Uploadd(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest();
            }

            var filePath = Path.Combine(Path.GetTempPath(), file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok();
        }
    }
}
