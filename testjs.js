//node testjs
const obj = {"message":["https://images.dog.ceo/breeds/shiba/shiba-1.jpg","https://images.dog.ceo/breeds/shiba/shiba-10.jpg","https://images.dog.ceo/breeds/shiba/shiba-11.jpg","https://images.dog.ceo/breeds/shiba/shiba-12.jpg","https://images.dog.ceo/breeds/shiba/shiba-13.jpg","https://images.dog.ceo/breeds/shiba/shiba-14.jpg","https://images.dog.ceo/breeds/shiba/shiba-2.jpg","https://images.dog.ceo/breeds/shiba/shiba-3i.jpg","https://images.dog.ceo/breeds/shiba/shiba-4.jpg","https://images.dog.ceo/breeds/shiba/shiba-5.jpg","https://images.dog.ceo/breeds/shiba/shiba-6.jpg","https://images.dog.ceo/breeds/shiba/shiba-7.jpg","https://images.dog.ceo/breeds/shiba/shiba-8.jpg","https://images.dog.ceo/breeds/shiba/shiba-9.jpg"],"status":"success"}

const msg = obj.message

console.log(msg)

const msgRandom = msg[Math.floor(Math.random() * 10)]

console.log("msg Random:-")
console.log(msgRandom)
