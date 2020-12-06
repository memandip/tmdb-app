import React from 'react';

import MovieCard from '../components/partials/MovieCard';

export default {
  title: 'MovieCard',
  component: MovieCard,
  argTypes: {
    text: 'loading..'
  },
};

const Template = (args) => <MovieCard {...args} />;

export const DefaultMovieCard = Template.bind({});
DefaultMovieCard.args = {
  id: 400160, 
  title: "The SpongeBob Movie: Sponge on the Run", 
  tagline: "They're Not in Bikini Bottom Anymore.", 
  image: "https://image.tmdb.org/t/p/original/wu1uilmhM4TdluKi2ytfz8gidHf.jpg", 
  text: "When his best friend Gary is suddenly snatched away, SpongeBob takes Patrick on a madcap mission far beyond Bikini Bottom to save their pink-shelled pal.", 
  isDetailPage:true, 
};