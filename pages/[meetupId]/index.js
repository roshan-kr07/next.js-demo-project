import MeetupDetails from "@/components/meetups/MeetupDetails";
import { MongoClient, ObjectId,  } from "mongodb";
import Head from "next/head";
import React, { Fragment } from "react";

function ShowMeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetails
        // title="Toronto Tech Meet-Up"
        // image="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/442753iED07047426BADCC5/image-size/large?v=v2&px=999"
        // address="551 George Street Millville, NJ 08332"
        // eventdate="Date: 29-Apr-2023"
        // description="The best way to expand your knowledge and network of the Toronto technology community"
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}


export async function getStaticPaths() {

  const client = await MongoClient.connect(
    'mongodb+srv://roshankumar123:Roshan123456@cluster0.wtbtumh.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // fallback: false,
   //  fallback: true, ya blocking kar sakate hai 404 error nahi aayega new meetup add karne par 
    fallback: 'blocking',
    //after fetching data from database
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // hard coding this array before we fetch data from mongodb
    // paths: [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
  
    // ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://roshankumar123:Roshan123456@cluster0.wtbtumh.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  // console.log(meetupId);

  return {
    // props: {
    //   meetupData: {
    //     image:
    //       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    //     id: meetupId,
    //     title: 'First Meetup',
    //     address: 'Some Street 5, Some City',
    //     description: 'This is a first meetup',
    //   },
    // },

     props: {
      // meetupData: selectedMeetup,
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}



export default ShowMeetupDetails;
