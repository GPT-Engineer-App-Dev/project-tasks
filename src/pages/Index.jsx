import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }} width="100%">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button colorScheme="blue" px={8} ml={2} onClick={addTask}>Add</Button>
        </Flex>
        <List spacing={3} width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md" borderRadius="md">
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <Flex>
                <Button onClick={() => toggleTaskCompletion(task.id)} colorScheme={task.isCompleted ? "green" : "gray"} size="sm" mr={2}>
                  <FaCheck />
                </Button>
                <Button onClick={() => deleteTask(task.id)} colorScheme="red" size="sm">
                  <FaTrash />
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;