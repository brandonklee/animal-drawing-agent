export const breeds = {
  dogs: [
    {
      id: 'pomeranian',
      name: 'Pomeranian',
      emoji: '🐶',
      type: 'dog',
      referenceImage: 'https://www.shutterstock.com/shutterstock/photos/2273914225/display_1500/stock-vector-cute-cartoon-pomeranian-spitz-spitz-dog-with-a-fluffy-tail-smiles-2273914225.jpg',
      steps: [
        'Draw a small circle for the head (like a grape)',
        'Draw a fluffy round shape for the body (like a cotton ball)',
        'Draw 4 tiny lines for the legs (very short and skinny)',
        'Draw a big, curly tail (like a spiral or cinnamon roll)',
        'Draw 2 pointy ears on top (like little triangles)',
        'Add 2 small dots for eyes, 1 dot for nose, and a smile'
      ]
    },
    {
      id: 'corgi',
      name: 'Corgi',
      emoji: '🐕',
      type: 'dog',
      referenceImage: 'https://drawcartoonstyle.com/wp-content/uploads/2023/01/14-add-blush-spots-and-color-the-inner-ears.jpg',
      steps: [
        'Draw a round circle for the head',
        'Draw a LONG oval for the body (corgis have long backs!)',
        'Draw 4 SHORT, STUMPY lines for the legs (super short!)',
        'Draw a tall, fluffy line for the tail (pointing up like a flag)',
        'Draw 2 BIG pointy ears on top (like triangles standing up)',
        'Add big happy eyes, a pink nose, and a big smile'
      ]
    },
    {
      id: 'shiba',
      name: 'Shiba Inu',
      emoji: '🐕',
      type: 'dog',
      referenceImage: 'https://i.pinimg.com/736x/a3/68/d9/a368d9f6e5ddba2db62051fa1ee15f00.jpg',
      steps: [
        'Draw a circle for the head',
        'Draw a medium oval for the body',
        'Draw 4 medium lines for the legs',
        'Draw a curly tail (like a donut spiral)',
        'Draw 2 pointy ears on top',
        'Add round eyes, a small black nose, and a happy expression with a little tongue sticking out'
      ]
    }
  ],
  cats: [
    {
      id: 'persian',
      name: 'Persian',
      emoji: '🐱',
      type: 'cat',
      referenceImage: 'https://i.pinimg.com/1200x/39/c7/f2/39c7f21970d474f5f7f6c41e81d4f0f2.jpg',
      steps: [
        'Draw a round circle for the head (very round!)',
        'Draw a fluffy round shape for the body (like a puffball)',
        'Draw 4 short lines for the legs',
        'Draw a big, fluffy curved tail',
        'Draw 2 pointy ears on top',
        'Add big round eyes, a tiny pink nose, and whiskers coming from the face'
      ]
    },
    {
      id: 'tabby',
      name: 'Tabby',
      emoji: '🐈',
      type: 'cat',
      referenceImage: 'https://media.istockphoto.com/id/1642703804/vector/simple-and-adorable-illustration-of-orange-tabby-cat-sleeping.jpg',
      steps: [
        'Draw a round circle for the head',
        'Draw a medium oval for the body',
        'Draw 4 medium lines for the legs',
        'Draw a curved tail',
        'Draw 2 pointy ears on top',
        'Add round eyes, nose, whiskers, and stripes on the body (like tiger stripes!)'
      ]
    },
    {
      id: 'ragdoll',
      name: 'Ragdoll',
      emoji: '🐱',
      type: 'cat',
      referenceImage: 'https://easydraweverything.com/wp-content/uploads/2025/03/cute-ragdoll-cat-drawing-8.jpg',
      steps: [
        'Draw a round circle for the head',
        'Draw a medium, relaxed oval for the body',
        'Draw 4 medium lines for the legs',
        'Draw a fluffy tail',
        'Draw 2 pointy ears',
        'Add BIG BLUE EYES (like sapphires!), pink nose, whiskers, and a calm, relaxed face'
      ]
    }
  ]
};

export const getAllBreeds = () => {
  return [...breeds.dogs, ...breeds.cats];
};

export const getBreedById = (id) => {
  return getAllBreeds().find(breed => breed.id === id);
};