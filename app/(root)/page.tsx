import react from 'react';
import SearchForm from '../../components/SearchForm';
import StartupCard, { StartupCardType } from '@/components/StartupCard';
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/query';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>
}){
  const query = (await searchParams).query;
  const params = {search: query || null};
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});

  const session = await auth();
  

    return (
    <>
      <section className="blue_container">
        <h6 className='tag'>PITCH, VOTE, AND GROW</h6>
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect with Entrepreneurs
        </h1>
        <p className='sub-heading !max w-3xl'>
          Submit Ideas, Vote on Pitches, and get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className='section-container'>
        <p className='text-30-semibold'>
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>

        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => 
              (<StartupCard key={post?._id} post={post}/>))
          ) : (
            <p className='no results'>
              No Startups Found
            </p>)}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
