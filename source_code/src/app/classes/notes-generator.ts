export class NotesGenerator {
    getList(notes:any) {
        let list = "";
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            if (typeof note === 'string') {
                list += `<li>${note}</li>`;
            } else {
                let tmpNote = '';
                const keys = Object.keys(note);
                for(let i = 0; i< keys.length; i++){
                    const val = note[keys[i]];
                    if (Array.isArray(val)) {
                        let tmpResult = "<ul>";
                        for (let j=0; j<val.length; j++) {
                            tmpResult += `<li>${val[j]}</li>`;
                        }
                        tmpResult = `${tmpResult}</ul>`;
                        tmpNote += tmpResult; 
                    }
                    else {
                        tmpNote += val;
                    }
                }
                list += `<li>${tmpNote}</li>`
            }
        }
        return list;
    }
}
