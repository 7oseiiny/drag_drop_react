
import { useEffect, useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios';



function App() {

  let [columns, setcolumns] = useState()

  useEffect(() => {
    axios.get(`http://localhost:3000/columns`).then((e) => { setcolumns(e.data) })
  }, [])
  console.log(columns);

  // let [data1, setdata1] = useState([
  //   {
  //     idd: 1,
  //     title: 'hello1'
  //   },
  //   {
  //     idd: 2,
  //     title: 'hello2sss'
  //   },
  //   {
  //     idd: 3,
  //     title: 'hello3'
  //   }
  // ])

  // let [data2, setdata2] = useState([
  //   {
  //     idd: 11,
  //     title: 'qqq1'
  //   },
  //   {
  //     idd: 22,
  //     title: 'qqq2'
  //   },
  //   {
  //     idd: 33,
  //     title: 'qqq3'
  //   }
  // ])

  // function handleOnDragEnd(result) {
  //   if (!result.destination) return
  //   console.log(result);
  //   if (result.destination.droppableId == result.source.droppableId) {
  //     if (result.destination.droppableId == 'list1') {
  //       let r = [...data1]
  //       let x = r.splice(result.source.index, 1)
  //       r.splice(result.destination.index, 0, x[0])
  //       setdata1(r);
  //     }
  //     if (result.destination.droppableId == 'list2') {
  //       let r = [...data2]
  //       let x = r.splice(result.source.index, 1)
  //       r.splice(result.destination.index, 0, x[0])
  //       setdata2(r);
  //     }
  //   }
  //   else {
  //     if (result.destination.droppableId == 'list1') {
  //       let r1 = [...data1]
  //       let r2 = [...data2]
  //       let x = r2[result.source.index]
  //       r1.splice(result.destination.index, 0, x)
  //       r2.splice(result.source.index, 1)
  //       console.log(r1);
  //       console.log(r2);
  //       setdata1(r1);
  //       setdata2(r2);
  //     }
  //     if (result.destination.droppableId == 'list2') {
  //       let r1 = [...data1]
  //       let r2 = [...data2]
  //       let x = r1[result.source.index]
  //       r2.splice(result.destination.index, 0, x)
  //       r1.splice(result.source.index, 1)
  //       setdata1(r1);
  //       setdata2(r2);
  //     }
  //   }
  // }

  function handleOnDragEnd(r) {

    let cols = [...columns]
    if (!r.destination) return
    console.log(r);
    let removed

    for (let col of cols) {
      let card_index = 0
      for (let card of col.cards) {
        if (card._id == r.draggableId) {
          removed = col.cards.splice(card_index, 1)
          console.log(removed);
        }
        card_index++
      }
    }
    for (let col of cols) {
      if (col._id == r.destination.droppableId) {
        console.log(removed);
        if (removed) {
          col.cards.splice(r.destination.index, 0, removed[0])
        }
      }
    }
    setcolumns(cols)
    axios.patch('http://localhost:3000/columns',cols)
  }



  return (
    <div className='main'>



      <DragDropContext onDragEnd={handleOnDragEnd}>
        {
          columns ?
            columns.map((e) => (
              <Droppable key={e._id} droppableId={e._id} >
                {(provided) => (
                  <div className="col" {...provided.droppableProps} ref={provided.innerRef}>
                    {e.cards.map((d, i) => (
                      <Draggable key={d._id} draggableId={d._id.toString()} index={i}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                            <div className='card'>{d.name}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))
            : <>loading . . .</>
        }
      </DragDropContext>



    </div>
  )
}

export default App
