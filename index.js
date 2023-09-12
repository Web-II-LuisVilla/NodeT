const express = require("express");

const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/enviar", (req, res) => {
    console.log(req.body)

  const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;

  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año) {
    return res.redirect("/error.html");
  }

  const contentFile = `Id: ${id}\nNombre: ${nombre}\nApellido: ${apellido}\nTitulo: ${titulo}\nAutor: ${autor}\nEditorial: ${editorial}\nAño: ${año}`

  const nameFile = `data/id_${id}.txt`;

  fs.writeFile(nameFile, contentFile, (err) => {
    if (err) {
      console.error(err);
      return res.redirect('/error.html');
    }

    res.download(nameFile, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al descargar el archivo");
      }
    });
  });
});

app.listen(port, () => console.log("funcionando", port));
