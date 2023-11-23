// import { prisma } from '@/utils/prisma'
// import { GraphQLClient, gql } from 'graphql-request';
//
//
// function getDatesBetween(startDate, endDate, dayStep) {
//   const currentDate = new Date(startDate.getTime());
//   const dates = [];
//   while (currentDate <= endDate) {
//     dates.push(new Date(currentDate).toISOString().split('T')[0]);
//     currentDate.setDate(currentDate.getDate() + dayStep);
//   }
//   return dates;
// }
//
//
// const client = new GraphQLClient(process.env.BITQUERY_URL, {
//   headers: {
//     Authorization: `Bearer ${process.env.BITQUERY_API_KEY}`,
//   },
// });
//
// const query = gql`
//   query TokenHoldersForDate($tokenAddress:String!, $date:String!) {
//     EVM(dataset: archive, network: eth) {
//       TokenHolders(
//         date: $date
//         tokenSmartContract: $tokenAddress
//         orderBy: {descending: Balance_Amount}
//         where: {Balance: {Amount: {gt: "0.0001"}}}
//       ) {
//         Holder {
//           Address
//         }
//         Balance {
//           Amount
//         }
//       }
//     }
//   }`;
//
//
//
// export async function GET() {
//   const dayStep = 1;
//   const dateFrom = new Date('2023-11-08')
//   const dateTo = new Date('2023-11-10')
//   const token = "0xb131f4a55907b10d1f0a50d8ab8fa09ec342cd74"
//
//   const allDates = getDatesBetween(dateFrom, dateTo, dayStep);
//   allDates.map(async (date) => {
//     console.log(`------------------ date`, date);
//
//     const variables = {
//       "tokenAddress": token,
//       "date": date
//     };
//
//     const exists = await prisma.tokenHolder.count({
//       where: {
//         date: new Date(variables.date),
//         tokenAddress: variables.tokenAddress
//       }
//     });
//
//     if (!exists) {
//       let progressCounter=0;
//       const response = await client.request(query, variables);
//       if (response && response['EVM']['TokenHolders']){
//         let insertData = [];
//         let total = 0;
//
//         // response['EVM']['TokenHolders'].map(async (account) => {
//         //   const balance = account['Balance']['Amount'];
//         //   const walletAddress = account['Holder']['Address'];
//         //
//         //   insertData.push({
//         //     date: new Date(variables.date),
//         //     network: "mainnet",
//         //     tokenAddress: variables.tokenAddress,
//         //     balance: parseFloat(balance),
//         //     walletAddress
//         //   });
//         //   total += parseFloat(balance);
//         // });
//         //
//         // console.log(`insertData.length`, insertData.length);
//         //
//         // await prisma.holdersTotal.create({
//         //   data: {
//         //     date: new Date(variables.date),
//         //     network: "mainnet",
//         //     tokenAddress: variables.tokenAddress,
//         //     total: parseFloat(total.toString())
//         //   },
//         // });
//         //
//         // await prisma.tokenHolder.createMany({
//         //   data: insertData,
//         //   skipDuplicates: true,
//         // });
//         //
//         // progressCounter++;
//         // console.log(`++++++++++++${progressCounter}/${allDates.length}`);
//
//         if(progressCounter == allDates.length){
//           return Response.json({ data: true })
//         }
//       }
//     } else {
//       return Response.json({ data: true })
//     }
//   });
//
//   // const data = await prisma.tokenHolder.findMany({
//   //   where: {
//   //     network: "mainnet",
//   //     tokenAddress: token,
//   //   }
//   // });
//
//   const data = {};
//   return Response.json({ data: data })
// }
