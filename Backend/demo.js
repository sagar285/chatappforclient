// const a =[
//     {
//     message:"sagar",
//     users:[1,2],
// //     sender:4
// // },
// //     {
// //     message:"sagar",
// //     users:[3,2],
// //     sender:1
// // },
// //     {
// //     message:"sagar",
// //     users:[1,3],
// //     sender:3
// // },
// //     {
// //     message:"sagar",
// //     users:[2,4],
// //     sender:2
// // },
// // ]

// // let b =2
// // const filteredArray = a.filter(item => item.users.includes(b));

// // console.log(filteredArray);

const array = [
  {
    text:{

    },
    imgurl:{

    }
  }
]

const messages ="sagar"

const imgurl  ="893439848934933493"



let ba=[
  {"__v": 9, "_id": "65efefcdb424fefbf9d4448c",
 "receiverId": {"__v": 0, "_id": "65ed9611e0528fb0ccde3b8c", "phone": 8871003387}, 

"senderId": {"__v": 0, "_id": "65ed95ffe0528fb0ccde3b8a", "phone": 9098742513}}
]

const numberExists = Object.values(ba[0].senderId).some(value =>value ===8871003387);
console.log(numberExists)





const a =[
  {
    __v: 0,
    _id: "65eefae8994afdcbd5f81d4c",
    createdAt: "2024-03-11T12:36:56.688Z",
    message: { text: "Hiikffooc" },
    sender: "65ed8f369828a02e970ddd3d",
    updatedAt: "2024-03-11T12:36:56.688Z",
    users: ["65ed8f369828a02e970ddd3d", "65ed95ffe0528fb0ccde3b8a"],
  },
  {
    __v: 0,
    _id: "65eefb15994afdcbd5f81d4f",
    createdAt: "2024-03-11T12:37:41.024Z",
    message: { text: "Hello " },
    sender: "65ed8f369828a02e970ddd3d",
    updatedAt: "2024-03-11T12:37:41.024Z",
    users: ["65ed8f369828a02e970ddd3d", "65ed95ffe0528fb0ccde3b8a"],
  },
  {
    __v: 0,
    _id: "65eefc61cb39c8f961804235",
    createdAt: "2024-03-11T12:43:13.319Z",
    message: { text: "Hello " },
    sender: "65ed8f369828a02e970ddd3d",
    updatedAt: "2024-03-11T12:43:13.319Z",
    users: ["65ed8f369828a02e970ddd3d", "65ed95ffe0528fb0ccde3b8a"],
  },
  {
    __v: 0,
    _id: "65eefc67cb39c8f96180423a",
    createdAt: "2024-03-11T12:43:19.765Z",
    message: { text: "Hello " },
    sender: "65ed8f369828a02e970ddd3d",
    updatedAt: "2024-03-11T12:43:19.765Z",
    users: ["65ed8f369828a02e970ddd3d", "65ed95ffe0528fb0ccde3b8a"],
  },
  {
    __v: 0,
    _id: "65eefcfa070472d3b50435f9",
    createdAt: "2024-03-11T12:45:46.811Z",
    message: { text: "Hdhd" },
    sender: "65ed8f369828a02e970ddd3d",
    updatedAt: "2024-03-11T12:45:46.811Z",
    users: ["65ed8f369828a02e970ddd3d", "65ed95ffe0528fb0ccde3b8a"],
  },
  {
    __v: 0,
    _id: "65eefe7f03bf8e73e41209b3",
    createdAt: "2024-03-11T12:52:15.360Z",
    message: { text: "Ff" },
    sender: "65ed8f369828a02e970ddd3d",
    updatedAt: "2024-03-11T12:52:15.360Z",
    users: ["65ed8f369828a02e970ddd3d", "65ed95ffe0528fb0ccde3b8a"],
  },
  {
    __v: 0,
    _id: "65eefec403bf8e73e41209bb",
    createdAt: "2024-03-11T12:53:24.692Z",
    message: { text: "Shd" },
    sender: "65ed8f369828a02e970ddd3d",
    updatedAt: "2024-03-11T12:53:24.692Z",
    users: ["65ed8f369828a02e970ddd3d", "65ed95ffe0528fb0ccde3b8a"],
  },
  {
    __v: 0,
    _id: "65eefec403bf8e73e41209bd",
    createdAt: "2024-03-11T12:53:24.773Z",
    message: { text: "Shd" },
    sender: "65ed8f369828a02e970ddd3d",
    updatedAt: "2024-03-11T12:53:24.773Z",
    users: ["65ed8f369828a02e970ddd3d", "65ed95ffe0528fb0ccde3b8a"],
  },
];
const b ="65ed95ffe0528fb0ccde3b8a"
const filteredArray = a.filter(item => item.users.includes(b))
// console.log(filteredArray)