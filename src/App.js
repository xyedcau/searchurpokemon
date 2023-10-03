import { useRef, useState } from 'react';
import './App.css';
import dexu from './pokedex.json';
import typesu from './types.json';

// mag tulong tulong pa kayo
// bobo ka mervin ./.
function App() {
	let sVal = '';
	const dex = dexu;
	const [poke, setPoke] = useState(dex);
	const hanp = useRef();
	const pili = useRef();

	const hanap = () => {
		pili.current.value = 'Any';
		if (sVal === '') {
			setPoke(dex);
		} else {
			setPoke(dex.filter(item => {
				if (item.name.english.toLowerCase().includes(sVal.toLowerCase())) {
					return item;
				}
			}));
		}
	}

	const byType = (e) => {
		let tsek = false;
		hanp.current.value = '';
		if (e.target.value === 'Any') {
			setPoke(dex);
		} else {
			setPoke(dex.filter(item => {
				item.type.forEach(typu => {
					if (e.target.value.toLowerCase() === typu.toLowerCase()) {
						tsek = true;
					}
				});
				if (tsek) {
					tsek = false;
					return item;
				}
			}));
		}
	}

	const ec = (e) => {
		sVal = e.target.value;
		hanap();
	}

  return (
		<>
			<div className="container">
				<input ref={hanp} onKeyUp={ec} type="text" placeholder="Search Pokemon..." />
				<select style={{marginLeft: '10px'}} ref={pili} onChange={byType}>
					<option value="Any">Any</option>
					{typesu.map((type, i) => (
						<option key={i} value={type.english}>{type.english}</option>
					))}
				</select>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Images</th>
							<th className="pad">Name</th>
							<th className="pad">Type</th>
						</tr>
					</thead>
					<tbody>
						{
							poke.map((pokem) => (
								<tr key={pokem.id}>
									<td><img width="50" src={`/images/${pokem.id < 10 ? '00' + pokem.id : pokem.id < 100 ? '0' + pokem.id : pokem.id}.png`} alt="" /></td>
									<td className="pad">{ pokem.name.english }</td>
									<td className="pad">{pokem.type.map((typ, i) => {
										if (i === pokem.type.length - 1) {
											return typ;
										}
										return `${typ}, `;
									})}
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</>
  );
}

export default App;
