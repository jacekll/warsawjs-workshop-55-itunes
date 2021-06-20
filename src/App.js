import {ChakraProvider, Input, ListItem, UnorderedList} from "@chakra-ui/react"
import './App.css';
import {Badge, Stack, Button} from "@chakra-ui/react"
import {useState} from "react"
import {
  Table,
  Thead,
  Tbody,
  Image,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"

function Itunes() {
    const [searchTerm, setSarchTerm] = useState("");
    const [results, setResults] = useState([
        {
            name: "WarsawJS",
        },
        {
            name: "React",
        }
    ])
    return (
        <Stack direction="column">
            <Stack direction="row">
                <Input value={searchTerm} onChange={(event) => {
                    setSarchTerm(event.target.value);
                }}></Input>
                <Button colorScheme="blue" onClick={async () => {
                    const result = await fetch(
                        `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=musicVideo`
                    );
                    const data = await result.json();
                    console.log(data);
                    setResults(data.results);
                }}>Search</Button>
            </Stack>
            <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Artist</Th>
                      <Th>Track</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                    results.map((result) => (
                        <Tr>
                            <Td>{result.artistName}</Td>
                            <Td>{result.trackName}</Td>
                            <Td><Image height="100px" src={result.artworkUrl100}/></Td>
                        </Tr>
                    ))
                    }
                  </Tbody>
                </Table>
        </Stack>
    )
}

function App() {
    const [count, setCount] = useState(5);
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
