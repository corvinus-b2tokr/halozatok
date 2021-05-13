using HajosTeszt.JokeModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    [Route("api/jokes")]
    [ApiController]
    public class JokerController : Controller
    {
        // GET: api/jokes
        [HttpGet]
        public IEnumerable<Joke> Get()
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            return context.Jokes.ToList();
        }

        // GET api/jokes/5
        [HttpGet("{id}")]
        public Joke Get(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var keresettVicc = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            return keresettVicc;
        }

        // POST api/jokes
        [HttpPost]
        public void Post([FromBody] Joke ujVicc)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            context.Jokes.Add(ujVicc);
            context.SaveChanges();
        }

        // DELETE api/jokes/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var torlendoVicc = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            context.Remove(torlendoVicc);
        }

        [HttpGet("count")]
        public int M3()
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            int viccekSzama = context.Jokes.Count();

            return viccekSzama;
        }
    }
}
