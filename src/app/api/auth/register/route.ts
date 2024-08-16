import { sql } from "@vercel/postgres";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log({ email, password });
    const hashedPassword = await hash(password, 10);
    const updatedAt = new Date().toISOString();

    const response = await sql`
    INSERT INTO users (email, password, updated_at)
    VALUES(${email}, ${hashedPassword}, ${updatedAt})
    `;
    // https://github.com/sequelize/cli/issues/681
    // 'use strict';

    // module.exports = {
    //   up: (queryInterface, Sequelize) => {
    //     return queryInterface.bulkInsert('Users', [{
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         email: 'demo@demo.com',
    //         // add createdAt, updatedAt
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //       }], {});
    //   }
    // };
  } catch (error) {
    console.log("사용자를 등록하는 데 실패했습니다.", error);
  }
  return Response.json({ message: "success" });
}
