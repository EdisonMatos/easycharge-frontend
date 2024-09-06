import { useEffect, useState } from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

function FilterableUserList() {
  const [points, setPoints] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);


  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const receiptId = searchParams.get('id');

  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    };
    if (email) {
      setSearchClicked(true);
      fetch(`http://localhost:8080/users/findByEmail/${email}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setFoundUser(data);
            setSearchInput(data.id)
          } else {
            setFoundUser(null);
          }
        })
    }
  }
  ,[])


  // Função para buscar usuário
  const handleSearch = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    };
    setSearchClicked(true);


    fetch(`http://localhost:8080/users/${searchInput}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setFoundUser(data);
        } else {
          setFoundUser(null);
        }
      })

  };

  // Função para resetar o estado inicial
  const resetForm = () => {
    setPoints('');
    setSearchInput('');
    setFoundUser(null);
    setSearchClicked(false);
  };

  // Função para adicionar pontos com alerta de confirmação
  const handleAddPoints = () => {
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({
        token,
        points
      }),
      headers: {
        "Content-Type": "application/json"
      },
    };
    const confirmation = window.confirm(
      `Tem certeza que deseja adicionar ${points} pontos para o usuário ${foundUser.name}?`,
    );
    if (confirmation) {
      
      fetch(`http://localhost:8080/users/addPoints/${searchInput}/${receiptId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data) {
            console.log(data)
            alert(`${points} pontos adicionados com sucesso!`);
          }
        })
    } else {
      alert('Operação cancelada.');
    }
    resetForm(); // Reseta o formulário após confirmar ou cancelar
  };

  // Função para permitir apenas números positivos no campo de pontos
  const handlePointsChange = (e: any) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Regex para permitir apenas números positivos
      setPoints(value);
    }
  };

  return (
    <FormControl
      id="user-form"
      className="bg-white p-[25px] rounded-3xl lg:w-[50%] flex flex-col"
    >
      <Text
        fontSize="22px"
        fontWeight="700"
        lineHeight="100%"
        className="mb-[22px]"
      >
        Adicione pontos para os usuários
      </Text>
      <p className="text-[16px] text-neutral-500 font-medium mb-[24px]">
        Selecione o usuário pesquisando o ID, insira o número de pontos a ser
        adicionado e confirme clicando no botão abaixo.
      </p>

      {/* Campo de busca de usuário por UUID */}
      <FormLabel>ID do Usuário:</FormLabel>
      <Input
        placeholder="Digite o ID do usuário"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-[50%]"
      />
      <Button
        mt="4"
        className="w-[50%] rounded-md"
        colorScheme="brand"
        onClick={handleSearch}
        isDisabled={!searchInput} // Só habilita se o input estiver preenchido
      >
        Localizar Usuário
      </Button>

      {/* Renderizar usuário localizado ou mensagem de erro apenas após o clique */}
      {searchClicked &&
        (foundUser ? (
          <Table mt="4" className="rounded-2xl bg-green-50">
            <Tbody>
              <Tr>
                <Td fontWeight="bold">Usuário localizado:</Td>
              </Tr>
              <Tr>
                <Td>ID:</Td>
                <Td>{foundUser.id}</Td>
              </Tr>
              <Tr>
                <Td>Nome:</Td>
                <Td>{foundUser.name}</Td>
              </Tr>
              <Tr>
                <Td>Saldo de Pontos:</Td>
                <Td>{foundUser.availablePoints}</Td>
              </Tr>
            </Tbody>
          </Table>
        ) : (
          <Text mt="4" color="red.500">
            Usuário não localizado. Verifique o ID digitado e tente novamente.
          </Text>
        ))}

      {/* Input de pontos só renderizado se o usuário for localizado */}
      {foundUser && (
        <>
          <FormLabel mt="4">Quantidade de Pontos:</FormLabel>
          <Input
            placeholder="Digite a quantidade"
            value={points}
            onChange={handlePointsChange}
            type="text" // Tipo text para controlar entrada de apenas números positivos
            className="w-[50%]"
          />
          <Button
            mt="4"
            className="w-[50%] rounded-md"
            colorScheme="brand"
            isDisabled={!points} // Só habilita se o input de pontos estiver preenchido
            onClick={handleAddPoints} // Adiciona pontos com confirmação
          >
            Adicionar Pontos
          </Button>
        </>
      )}
    </FormControl>
  );
}

export default FilterableUserList;
