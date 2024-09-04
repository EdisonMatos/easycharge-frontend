import { useState } from 'react';
import {
  Input,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Text,
} from '@chakra-ui/react';

function FilterableUserList() {
  const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [points, setPoints] = useState('');

  const users = [
    { name: 'João', points: 120 },
    { name: 'Carlos', points: 85 },
    { name: 'Maria', points: 150 },
    { name: 'Ana', points: 70 },
    { name: 'Pedro', points: 95 },
    { name: 'Juliana', points: 110 },
    { name: 'Rafael', points: 130 },
  ];

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(filter.toLowerCase()))
    .slice(0, 5);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setFilter(user.name);
  };

  const handleAddPoints = () => {
    if (!selectedUser || !points) {
      alert('Todos os campos precisam ser preenchidos.');
      return;
    }

    const confirmMessage = `Tem certeza que deseja adicionar ${points} pontos para ${selectedUser.name}?`;
    if (window.confirm(confirmMessage)) {
      alert(`Pontos adicionados ao usuário ${selectedUser.name}.`);
    }
  };

  return (
    <FormControl
      id="country"
      className="bg-white p-[25px] rounded-md lg:w-[50%] flex flex-col"
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
        Selecione o usuário pesqusando o nome, insira o número de pontos a ser
        adicionado e confirme clicando no botão abaixo.
      </p>
      <FormLabel>Nome:</FormLabel>
      <Popover
        isOpen={filter.length > 0 && filteredUsers.length > 0 && !selectedUser}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <Input
            placeholder="Digite o nome do usuário"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setSelectedUser('');
            }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody className="bg-neutral-100">
            <List>
              {filteredUsers.map((user, index) => (
                <ListItem
                  className="my-[15px] p-[10px] border-b-2 border-b-solid border-[1px] bg-white"
                  key={index}
                  onClick={() => handleSelectUser(user)}
                  cursor="pointer"
                  _hover={{ backgroundColor: 'gray.100' }}
                >
                  {user.name} - Saldo em conta: {user.points} pontos
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <FormLabel mt="4">Quantidade de Pontos:</FormLabel>
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
        onClick={handleAddPoints}
      >
        Adicionar Pontos
      </Button>
    </FormControl>
  );
}

export default FilterableUserList;
