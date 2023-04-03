import chalk from "chalk"
import fs from "fs"
import pegaArquivo from "./index.js"

const caminho = process.argv

function imprimeLista (resultado, arquivo = '') {
    console.log(
        chalk.yellow('Lista de links'),
        chalk.black.bgGreen(arquivo),
        resultado
    )
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]

    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log("Arquivo ou diretório não encontrado")
            return
        }
    }

    if(fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho)

        imprimeLista(resultado)
    } else if(fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)

        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            
            imprimeLista(lista, nomeDeArquivo)
        })
    }
}

processaTexto(caminho)