import {ChakraProvider, Input, ListItem, UnorderedList} from "@chakra-ui/react"
import './App.css';
import {Badge, Stack, Button} from "@chakra-ui/react"
import {useState} from "react"

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
            <UnorderedList>
                {
                    results.map((result) => (
                        <ListItem>{result.trackName} by {result.artistName}</ListItem>
                    ))
                }
                <ListItem>bla</ListItem>
                <ListItem>bla 2</ListItem>
            </UnorderedList>
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

                        <Stack direction="row">
                            <Badge>{count}</Badge>
                            <Button colorScheme="green" onClick={() => {
                                setCount(count + 1);
                            }}>+</Button>
                            <Button colorScheme="red" onClick={() => {
                                setCount(count - 1);
                            }}>+</Button>
                        </Stack>
                    </Stack>
                </header>


            </div>
        </ChakraProvider>
    );
}

export default App;
