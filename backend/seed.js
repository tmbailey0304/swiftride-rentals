const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const seed = async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS rentals, vehicles, users CASCADE`);

    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'customer'
      );

      CREATE TABLE vehicles (
        id SERIAL PRIMARY KEY,
        img TEXT,
        name TEXT,
        make TEXT,
        model TEXT,
        year TEXT,
        doors TEXT,
        ac TEXT,
        transmission TEXT,
        fuel TEXT,
        price TEXT,
        available BOOLEAN DEFAULT true
      );

      CREATE TABLE rentals (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        vehicle_id INT REFERENCES vehicles(id),
        start_date DATE,
        end_date DATE
      );
    `);

    await pool.query(`
      INSERT INTO vehicles (img, name, make, model, year, doors, ac, transmission, fuel, price)
      VALUES
        ('https://di-uploads-pod28.dealerinspire.com/colonialtoyota/uploads/2022/10/mlp-img-top-2023-corolla-temp.png', 'Toyota Corolla', 'Toyota', 'Corolla', '2023', '4/5', 'Yes', 'Automatic', 'Gasoline', '25'),
        ('https://di-uploads-pod23.dealerinspire.com/rairdonshondaofburien/uploads/2022/10/2023-HONDA-CIVIC-LEAD-IMAGE-BLUE.png', 'Honda Civic', 'Honda', 'Civic', '2023', '4/5', 'Yes', 'Automatic', 'Gasoline', '28'),
        ('https://file.kelleybluebookimages.com/kbb/base/evox/CP/12502/2018-Ford-Focus-front_12502_032_1796x829_GN_cropped.png', 'Ford Focus', 'Ford', 'Focus', '2023', '4/5', 'Yes', 'Automatic', 'Gasoline', '30'),
        ('https://images.dealer.com/ddc/vehicles/2021/Volkswagen/Jetta/Sedan/perspective/front-left/2000_24.png', 'Volkswagen Jetta', 'Volkswagen', 'Jetta', '2023', '4/5', 'Yes', 'Automatic', 'Gasoline', '35'),
        ('https://images.dealer.com/ddc/vehicles/2021/Nissan/Altima/Sedan/perspective/front-left/2021_24.png', 'Nissan Altima', 'Nissan', 'Altima', '2012', '4/5', 'Yes', 'Manual', 'Gasoline', '40'),
        ('https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2019-BMW-3-Series-Sunset-Orange-Metallic.png', 'BMW 3 Series', 'BMW', '3 Series', '2023', '4/5', 'Yes', 'Automatic', 'Gasoline', '65')
    `);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();
