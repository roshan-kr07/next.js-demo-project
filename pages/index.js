//our-domain.com/

import Layout from "@/components/layout/Layout";
import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useEffect, useState } from "react";




// const DUMMY_MEETUPS = [
//   {
//     id: 1,
//     title: "Toronto Tech Meet-Up",
//     image:
//       "https://techcommunity.microsoft.com/t5/image/serverpage/image-id/442753iED07047426BADCC5/image-size/large?v=v2&px=999",
//     address: "551 George Street Millville, NJ 08332",
//     eventdate: "Date: 29-Apr-2023",
//     description:
//       "The best way to expand your knowledge and network of the Toronto technology community",
//   },
//   {
//     id: 2,
//     title: "Los Angeles Hackers",
//     image:
//       "https://sugermint.com/wp-content/uploads/2020/02/Hackers-meetup-in-Ahmedabad.jpg",
//     address: "15 2nd Ave. Grand Blanc, MI 48439",
//     eventdate: "Date: 30-Apr-2023",
//     description:
//       "This is a meet-up group specifically for Hackers of LosAngeles. If you don't know what that is, this isn't the meet-up you're looking for",
//   },
//   {
//     id: 3,
//     title: "Helsinki Startup Lovers",
//     image: "https://startupnetwork.eu/wp-content/uploads/2022/04/000-3.png",
//     address: "8613 Hudson St. Kearny, NJ 07032",
//     eventdate: "Date: 01-May-2023",
//     description:
//       "Meet the bay area UI5 community and spread the love for startup technology",
//   },
// ];



function HomePage(props) {
  //BEFORE USING getStaticProps()
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   //send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // },[])

  return (
    <>
    <Head>
      <title>React Meetups</title>
      <meta 
      name="description" 
      content="Browse a huge list of highly active React Meetups!"
      />
    </Head>
      {/* <Layout> */}
      {/* <MeetupList meetups={DUMMY_MEETUPS} /> */}
      {/* <MeetupList meetups={loadedMeetups} /> */}
      <MeetupList meetups={props.meetups} />
      {/* </Layout> */}
    </>
  );
}

export async function getStaticProps() {
  //pre build ke time agar data fetch karn hua tab is func ko use karenge
  //ex-- fetch data from an API

  //fetch('/api/meetups'); //meetups new folder ka naam hai jis me hum data get karne ke liye code likhte
  //or yaha pr us folder ka path de dete but kyuki code expose nahi hoga isliye hum direct yahi isi folder me 
  //  code likh denge or file create nahi karenge api folder me MEETUPS.js ka...

  const client = await MongoClient.connect(
    'mongodb+srv://roshankumar123:Roshan123456@cluster0.wtbtumh.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();


  return {
    props: {
      // yaha props name hi hoga
      // meetups: DUMMY_MEETUPS,  DATA MONGODB SE GET KARNE SE PAHLE DUMMY MEETUP USE KER RAHE THE
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, //page ko re generate karne ke liye
  };
}




  // export async function getServerSideProps(context) {
  //   //fetch data form an API
  //   return {
  //     props:{
  //       meetups: DUMMY_MEETUPS,
  //     }
  //   }
  // }


export default HomePage;
