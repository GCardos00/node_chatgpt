const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const axios = require("axios");
const Product = require("./models/Product");

const app = express();

const OPENAI_API_KEY = "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";

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const { produto, marca, modelo } = req.body;

  const prompt = `Produto: ${produto}\nMarca: ${marca}\nModelo: ${modelo}\nDescrição:`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const descricao = response.data.choices[0].text.trim();
    const palavrasChave = [
      produto,
      marca,
      modelo,
      "palavra1",
      "palavra2",
      "palavra3",
    ].join(", ");

    await Product.create({ produto, marca, modelo, descricao, palavrasChave });

    res.render("index", { descricao, palavrasChave });
  } catch (error) {
    console.error(error);
    res.render("index", {
      error: "Ocorreu um erro ao gerar a descrição e palavras-chave.",
    });
  }
});

// Inicializar o servidor
app.listen(3000, () => {
  console.log("Servidor está rodando na porta 3000");
});
