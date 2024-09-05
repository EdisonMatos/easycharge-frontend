import { useState } from 'react';
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

function FilterableUserList() {
  const [points, setPoints] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);

  // Lista de usuários com UUID fixos
  const users = [
    { id: 'd290f1ee-6c54-4b01-90e6-d701748f0851', name: 'João', points: 120 },
    { id: 'd290f1ee-6c54-4b01-90e6-d701748f0852', name: 'Carlos', points: 85 },
    { id: 'd290f1ee-6c54-4b01-90e6-d701748f0853', name: 'Maria', points: 150 },
    { id: 'd290f1ee-6c54-4b01-90e6-d701748f0854', name: 'Ana', points: 70 },
    { id: 'd290f1ee-6c54-4b01-90e6-d701748f0855', name: 'Pedro', points: 95 },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0856',
      name: 'Juliana',
      points: 110,
    },
    { id: 'd290f1ee-6c54-4b01-90e6-d701748f0857', name: 'Rafael', points: 130 },
  ];

  // Função para buscar usuário
  const handleSearch = () => {
    setSearchClicked(true);
    const user = users.find((user) => user.id === searchInput);
    if (user) {
      setFoundUser(user);
    } else {
      setFoundUser(null);
    }
  };

  // Função para adicionar pontos com alerta de confirmação
  const handleAddPoints = () => {
    const confirmation = window.confirm(
      `Tem certeza que deseja adicionar ${points} pontos para o usuário ${foundUser.name}?`,
    );
    if (confirmation) {
      alert('Pontos adicionados com sucesso!');
      window.location.reload(); // Atualiza a página após confirmar
    } else {
      alert('Operação cancelada.');
      // Retorna ao estado inicial
      setPoints('');
      setSearchInput('');
      setFoundUser(null);
      setSearchClicked(false);
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
          <Table mt="4" className="bg-green-50 rounded-2xl">
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
                <Td>{foundUser.points}</Td>
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
          <FormLabel mt="4">Adicionar Pontos:</FormLabel>
          <Input
            placeholder="Digite a quantidade"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            type="number"
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
