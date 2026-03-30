import prisma from "../src/prisma.js";
import bcrypt from "bcryptjs";

async function main(){
    const hashedPass = await bcrypt.hash('xxx', 10);
     const god = await prisma.user.create({
        data: {
            fullname: 'god',
            userName: 'god',
            email: 'xxx@gmail.com',
            password: hashedPass,
            role: 'GOD'
        }
    })
    console.log('GOD created:', god);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

