# Instalation

``npm install tracker.gg``

---

# Example

```js
import { TrackerClient } from 'tracker.gg'
const client = new TrackerClient("APIKEY")

let data = await client.getOverwatchStats("psn", "SomeRandomUsername")
console.log(data)
```
