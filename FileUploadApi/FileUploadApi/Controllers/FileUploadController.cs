using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult> Upload(IFormFile file)
        {
            if (file == null)
            {
                return BadRequest("No file found.");
            }

            try
            {
                string uploadsFolderPath = Path.Combine(_hostEnvironment.ContentRootPath, "Uploads");

                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                string filePath = Path.Combine(uploadsFolderPath, file.FileName);

                //using FileStream stream = new(filePath, FileMode.Create);
                //await file.CopyToAsync(stream);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error ocurred: {ex.Message}");
            }

            return Ok();
        }
    }
}
