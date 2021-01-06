import React from "react";
import Icone from "../Icone/Icone";
import iconeFavoritoBranco from "../../img/icone-favorito-branco.svg";
import iconeFavoritoPreto from "../../img/icone-favorito-preto.svg";
import {
  Container,
  ContainerGeral,
  ContainerFiltro,
  CrescenteDecrescente,
  ContainerCard,
  Card,
  Button,
  ContainerCarrinho,

  IconeX,

  Checkbox,

} from "./Style";

class Home extends React.Component {
  state = {
    produtos: [
      {
        id: 1,
        name: "Item A",
        value: 50.0,
        imageUrl: "https://picsum.photos/200/200?a=1",
        favorito: false,
      },
      {
        id: 2,
        name: "Item B",
        value: 20.0,
        imageUrl: "https://picsum.photos/200/200?a=2",
        favorito: false,
      },
      {
        id: 3,
        name: "Item C",
        value: 150.0,
        imageUrl: "https://picsum.photos/200/200?a=3",
        favorito: false,
      },
      {
        id: 4,
        name: "Item D",
        value: 349.0,
        imageUrl: "https://picsum.photos/200/200?a=4",
        favorito: false,
      },
      {
        id: 5,
        name: "Item E",
        value: 23.55,
        imageUrl: "https://picsum.photos/200/200?a=5",
        favorito: false,
      },
      {
        id: 6,
        name: "Item F",
        value: 123.0,
        imageUrl: "https://picsum.photos/200/200?a=6",
        favorito: false,
      },
      {
        id: 7,
        name: "Item G",
        value: 27.0,
        imageUrl: "https://picsum.photos/200/200?a=7",
        favorito: false,
      },
      {
        id: 8,
        name: "Item H",
        value: 950.0,
        imageUrl: "https://picsum.photos/200/200?a=8",
        favorito: false,
      },
    ],
    ordenado: false,
    contador: 1,
    novaListaCarrinho: [],

    valorInputBusca: "",
    valorInputMinimo: "",
    valorInputMaximo: "",
    checkboxFavoritos: false
  };

  // ORDENAR PRODUTOS EM CRESCENTE E DECRESCENTE
  onChangeSelect = () => {
    const listaOrdenada = this.state.produtos.sort(function (a, b) {
      return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
    });
    this.setState({ produtos: listaOrdenada });
    this.setState({ ordenado: !this.state.ordenado });
    if (this.state.ordenado === false) {
      this.setState({ produtos: listaOrdenada.reverse() });
    }
  };
  // INVERTE O VALOR DO ESTADO DO CHECKBOX QUE FILTRA FAVORITOS
  onChangeCheckbox = (event) => {
    this.setState({checkboxFavoritos: !this.state.checkboxFavoritos})
    if (!this.state.checkboxFavoritos === true) {
    }

  }

  onChangeInputMinimo = (event) => {
    this.setState({ valorInputMinimo: event.target.value });
  };

  onChangeInputMaximo = (event) => {
    this.setState({ valorInputMaximo: event.target.value });
  };

  onChangeInputBusca = (event) => {
    this.setState({ valorInputBusca: event.target.value });
  };

  // ADICIONAR PRODUTOS AO CARRINHO

  adicionarNoCarrinho = (produto) => {
    let carrinho = produto;
    this.setState({
      novaListaCarrinho: [...this.state.novaListaCarrinho, carrinho],
    });
  };
  //Deletar produto do carrinho
  apagarItemCarrinho = (itemId) => {
    //console.log("apagar produto", itemId);
    const listaItensCarrinho = this.state.novaListaCarrinho.filter((itens) => {
      if (itemId === itens.id) {
        return false;
      } else {
        return true;
      }
    });
    this.setState({ novaListaCarrinho: listaItensCarrinho });
  };
  //marcar coo favorito
  onClickFavorito = (id) => {
    const arrayFavorito = this.state.produtos;
    console.log(arrayFavorito);
    const recebeIndex = arrayFavorito.findIndex((produto) => produto.id === id);
    arrayFavorito[recebeIndex].favorito = !arrayFavorito[recebeIndex].favorito;
    this.setState({ produtos: arrayFavorito });
  };
  //local storge  e ciclo de vida

  componentDidUpdate = () => {
    const novoCarrinho = this.state.novaListaCarrinho;

    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho)); //gurdar o carrinho //pega um array-objeto e transforma em string para guardar
  };

  componentDidMount = () => {
    const carrinhoNoLocalStorage = localStorage.getItem("carrinho"); //para buscar o valor q foi guardado no local storge

    const carrinhoObjeto = JSON.parse(carrinhoNoLocalStorage); //para transformas noavmente em array-objeto

    console.log(carrinhoObjeto);
  };

  componentWillUnmount = () => {};

  //renderização condicional do filtro
  render() {
    let maiusculas = this.state.valorInputBusca.toUpperCase();
    let listaDoEstado = this.state.produtos;
    if (this.state.valorInputBusca !== "") {
      listaDoEstado = listaDoEstado.filter((produto) => {
        return produto.name.includes(maiusculas);
      });
    } else if (this.state.valorInputMaximo !== "") {
      listaDoEstado = listaDoEstado.filter((produto) => {
        return produto.value <= this.state.valorInputMaximo;
      });
    } else if (this.state.valorInputMinimo !== "") {
      listaDoEstado = listaDoEstado.filter((produto) => {
        return produto.value >= this.state.valorInputMinimo;
      });
    } else if (this.state.checkboxFavoritos === true) {
      listaDoEstado = listaDoEstado.filter((produto) => {
        return produto.favorito === true;
      });
    }

    // Cópia do state produtos
    const listaRenderizada = listaDoEstado.map((produto) => {
      return (
        <Card>
          <img src={produto.imageUrl} alt="Imagem do produto" />
          <p>{produto.name}</p>
          <p>R$ {produto.value}</p>

          <Button onClick={() => this.adicionarNoCarrinho(produto)}>
            Adicionar ao Carrinho
          </Button>

          <Icone
            icone={produto.favorito ? iconeFavoritoPreto : iconeFavoritoBranco}
            onClickIcone={() => this.onClickFavorito(produto.id)}
          />
        </Card>
      );
    });

    // MAP DO ARRAY DE PRODUTOS ADICIONADOS PARA PEGAR O VALOR DO PRODUTO
    const valorDoItem = this.state.novaListaCarrinho.map((item) => {
      return item.value;
    });

    // NOVO ARRAY COM OS PRODUTOS ADICIONADOS PARA PEGAR A QUANTIDADE DE CADA PRODUTO
    let arrayProdutoAdicionado = [];
    this.state.novaListaCarrinho.forEach((produto) => {
      const estaNoArray = arrayProdutoAdicionado.findIndex(
        (prod) => prod.id === produto.id
      );
      if (estaNoArray === -1) {
        const novoProduto = {
          id: produto.id,
          name: produto.name,
          quantidade: 1,
        };
        arrayProdutoAdicionado.push(novoProduto);
      } else {
        const quantidadeEncontrada =
          arrayProdutoAdicionado[estaNoArray].quantidade;
        arrayProdutoAdicionado[estaNoArray] = {
          ...arrayProdutoAdicionado[estaNoArray],
          quantidade: quantidadeEncontrada + 1,
        };
      }
    });
    // MAP DO ARRAY DE PRODUTOS ADICIONADOS PARA PEGAR A QUANTIDADE DE
    //CADA PRODUTO E O RESPECTIVO NOME
    const nomeDoItem = arrayProdutoAdicionado.map((item) => {
      return (
        <div>
          <p>
            {item.quantidade}x {item.name} -{" "}
            <IconeX onClick={() => this.apagarItemCarrinho(item.id)}>X</IconeX>
            {/*NOVO*/}
          </p>
        </div>
      );
    });

    // REDUCE PARA SOMAR OS VALORES DE TODOS OS PRODUTOS NO CARRINHO
    const soma = valorDoItem.reduce(
      (soma, valorDoItem) => soma + valorDoItem,
      0
    );

    // CONST PARA INDICAR A QUANTIDADE DE PRODUTOS
    const numeroDeProdutos = listaDoEstado.length;

    // ============================================================
    return (
      <Container>
        <CrescenteDecrescente>
          {" "}
          <select onChange={this.onChangeSelect}>
            <option></option>
            <option value="descrescente">Preço: Decrescente</option>
            <option value="crescente">Preço: Crescente</option>
          </select>
          <p>Quantidade de Produtos: {numeroDeProdutos}</p>
        </CrescenteDecrescente>
        <ContainerGeral>
          {/*filtro*/}
          <ContainerFiltro>
            <h1>Filtros</h1>
            <label>Valor Mínimo:</label>
            <input
              type="number"
              value={this.state.valorInputMinimo}
              onChange={this.onChangeInputMinimo}
            ></input>
            <label>Valor Máximo:</label>
            <input
              type="number"
              value={this.state.valorInputMaximo}
              onChange={this.onChangeInputMaximo}
            ></input>
            <label>Buscar Produto</label>
            <input
              value={this.state.valorInputBusca}
              onChange={this.onChangeInputBusca}
            ></input>
            <div>
              <label>Filtrar Favoritos</label>
              <Checkbox type="checkbox" onChange={this.onChangeCheckbox} value={this.state.checkboxFavoritos} />
            </div>
          </ContainerFiltro>

          {/*cards*/}
          <ContainerCard>{listaRenderizada}</ContainerCard>
          {/*crescente decrescente*/}

          {/*carrinho*/}
          <ContainerCarrinho>
            <h1>Carrinho:</h1>
            {/*NOME DE CADA ITEM NO CARRINHO*/}
            {nomeDoItem}
            {}
            {/*TOTAL SOMA DOS PRODUTOS NO CARRINHO*/}
            <p>R${soma}</p>
          </ContainerCarrinho>
        </ContainerGeral>
      </Container>
    );
  }
}
export default Home;
