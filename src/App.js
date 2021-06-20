import {AspectRatio, ChakraProvider, Input, Link, Spinner} from "@chakra-ui/react"
import './App.css';
import {Stack, Button} from "@chakra-ui/react"
import {useState} from "react"

import { useDisclosure } from "@chakra-ui/react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

import {
  Table,
  Thead,
  Tbody,
  Image,
  Tr,
  Th,
    Td
} from "@chakra-ui/react"

function Detail({ result }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" >View</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{result.trackName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AspectRatio maxW="580px" ratio={1}>
                <iframe title="listen" src={result.previewUrl} allowFullScreen />
            </AspectRatio>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function Itunes() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([
    ])
    const [showSpinner, setShowSpinner] = useState(false);

    return (
        <Stack direction="column">
            <Stack direction="row">
                <Input value={searchTerm} onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}></Input>
                <Button colorScheme="blue" onClick={async () => {
                    setShowSpinner(true);
                    const result = await fetch(
                        `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=musicVideo`
                    );
                    const data = await result.json();
                    setShowSpinner(false);
                    console.log(data.results);
                    setResults(data.results);
                }}>Search</Button>
            </Stack>
            {showSpinner && <Spinner />}
            if (results.length) {
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Artist</Th>
                        <Th>Track</Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        results.map((result) => (
                            <Tr>
                                <Td>{result.artistName}</Td>
                                <Td><Link href={result.trackViewUrl} isExternal>{result.trackName}</Link></Td>
                                <Td>
                                    <Image borderRadius="full" objectFit="cover" width="100px" height="100px" src={result.artworkUrl100}/></Td>
                                <Td>
                                    <Detail result={result} />
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
                </Table>
            }
        </Stack>
    )
}

function App() {
    return (
        <ChakraProvider>
            <div className="App">
                <header className="App-header">
                    <Stack direction="column">
                        <Itunes></Itunes>
                    </Stack>
                </header>
            </div>
        </ChakraProvider>
    );
}

export default App;
