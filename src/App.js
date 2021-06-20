import {ChakraProvider, Input, Link} from "@chakra-ui/react"
import './App.css';
import {Stack, Button} from "@chakra-ui/react"
import {useState} from "react"
import {
  Table,
  Thead,
  Tbody,
  Image,
  Tr,
  Th,
    Td
} from "@chakra-ui/react"

function Itunes() {
    const [searchTerm, setSarchTerm] = useState("");
    const [results, setResults] = useState([
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
                    console.log(data.results);
                    setResults(data.results);
                }}>Search</Button>
            </Stack>
            if (results.length) {
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
                                <Td><Link href={result.trackViewUrl} isExternal>{result.trackName}</Link></Td>
                                <Td><Image borderRadius="full" objectFit="cover" width="100px" height="100px" src={result.artworkUrl100}/></Td>
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
