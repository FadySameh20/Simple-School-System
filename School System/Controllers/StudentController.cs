using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using School_System.Models;
using System.Collections.Generic;

namespace School_System.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "9NGm3xa4o3GwPK6VffF66YcxI2maniSMdCwKCHOj",
            BasePath = "https://simple-school-system-default-rtdb.firebaseio.com"
        };
        IFirebaseClient client;

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                client = new FireSharp.FirebaseClient(config);
                FirebaseResponse response = client.Get("Students");
                dynamic data = JsonConvert.DeserializeObject<dynamic>(response.Body);
                var list = new List<StudentModel>();
                if (data != null)
                {
                    foreach (var item in data)
                    {
                        list.Add(JsonConvert.DeserializeObject<StudentModel>(((JProperty)item).Value.ToString()));
                    }
                }

                return StatusCode(StatusCodes.Status200OK, list);
            } catch(Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, null);
            }
        }

        [HttpPost]
        public async void Post(List<StudentModel> students)
        {
            try
            {
                client = new FireSharp.FirebaseClient(config);

                Task<PushResponse>[] batchedResponses = new Task<PushResponse>[students.Count];
                int i = 0;
                foreach (var student in students)
                {
                    var data = student;
                    Task<PushResponse> response = client.PushAsync("Students/", data);
                    batchedResponses[i++] = response;
                }
                await Task.WhenAll(batchedResponses);

                /* foreach (var student in students)
                {
                    var data = student;
                    PushResponse response = client.Push("Students/", data);
                    //data.id = response.Result.name;
                    //SetResponse setResponse = client.Set("Students/" + data.id, data);

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        ModelState.AddModelError(string.Empty, "Added Succesfully");
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Something went wrong!!");
                    }
                }*/

                /*FirebaseResponse response = client.Update("Students/", students);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    ModelState.AddModelError(string.Empty, "Added Succesfully");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Something went wrong!!");
                }*/

            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, "Something went wrong!!");
            }
        }
    }
}
