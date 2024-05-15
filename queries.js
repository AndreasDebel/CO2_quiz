const { Pool } = require("pg");
require("dotenv").config();
const csvtojson = require("csvtojson");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

//route for /foods
const getFoods = (request, response) => {
    pool.query("SELECT * FROM klimadata_tmp", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

//route for /emission
const getEmission = (request, response) => {
    pool.query("SELECT * FROM emission", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };



  //route for /insert-food
const insertFood = (request, response) => {
    const { produkt, kategori, co2e_kg, landbrug, iluc, forarbejdning, emballage, transport, detail } = request.body;
    pool.query(
      `INSERT INTO klimadata_tmp (produkt, kategori, co2e_kg, landbrug, iluc, forarbejdning, emballage, transport, detail) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [produkt, kategori, co2e_kg, landbrug, iluc, forarbejdning, emballage, transport, detail],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`Food added`);
      }
    );
  };

  //route for /populateFoods
const populateFoods = (request, response) => {
    const klimadata = "klimadatabase.csv"; 
    const options = {
        delimiter: ';'
      };

    csvtojson().fromFile(klimadata, options).then(source => {
        //Fetching the data from each row
        //and inserting to the table food_tmp
      
            // console.log(source[i]);

            // 1) Man henter den string, der står i source[i]["co2e_kg"]
            // 2) Man ændrer stringen fra "0,96" til "0.96"
            // 3) man ændrer stringen til en float (decimaltal

      for (var i = 0; i < source.length; i++) {
       
              var produkt = source[i].Produkt;
              var kategori = source[i].Kategori;
              var CO2e_kg = source[i].CO2e_kg;
              var landbrug = source[i].Landbrug;
              var iluc = source[i].ILUC;
              var forarbejdning = source[i].Forarbejdning;
              var emballage = source[i].Emballage;
              var transport = source[i].Transport;
              var detail = source[i].Detail;
              //TODO: fortsæt med de andre kolonner
   
             let insertStatement = `INSERT INTO klimadata_tmp (produkt, kategori, CO2e_kg, landbrug, iluc, forarbejdning, emballage, transport, detail) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
            let items = [
              produkt,
              kategori,
              CO2e_kg,
              landbrug,
              iluc,
              forarbejdning,
              emballage,
              transport,
              detail];
        console.log(source[i]);
          
          
          
          
          
          
  
            //TODO: her skal laves to variabler: insertStatement og items. 
            //insertStatement skal bestå af sådan som du vil indsætte data i food_tmp tabellen, men med 
            //placeholders $1, $2 osv i stedet for værdier
            //items er en array med de variabler der er blevet defineret ud fra vores data lige ovenover
    
         
       
            //Inserting data of current row into database
            pool.query(insertStatement, items, (err, results, fields) => {
                if (err) {
                    console.log("Unable to insert item at row " + i+1);
                    return console.log(err);
                }
            });
        }
        response.status(201).send('All foods added');
    });
  }

module.exports = {
  getFoods,
  getEmission,
  insertFood,
  populateFoods,
};



//  In the context of parameterized queries using the pg library in Node.js, the placeholders are represented by $1, $2, and so on, instead of using ${name} syntax
// The reason for this difference is that the $1, $2 syntax is specific to the pg library and the PostgreSQL query protocol. It is used to bind parameters securely and efficiently in the query.
// When using parameterized queries with the pg library, you pass the actual values as an array in the second parameter of the query() function. The library internally maps these values to the corresponding placeholders in the SQL query string based on their position in the array.
// Therefore, in the given code snippet, you should continue using $1, $2, and $3 placeholders to represent the variables name, email, and id, respectively, instead of using the ${name} syntax.




