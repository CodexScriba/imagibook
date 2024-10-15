// src/data/storyStructure.ts

/**
 * Interface representing the structure of a story structure item.
 */
export interface StoryStructure {
    /**
     * Unique identifier for the story structure.
     */
    id: number;
    
    /**
     * Title of the story structure.
     */
    title: string;
    
    /**
     * Detailed definition and description of the story structure.
     */
    definition: string;
  }
  
  /**
   * Array containing all available story structures for the Imagibook app.
   */
  export const storyStructures: StoryStructure[] = [
    {
      id: 1,
      title: "Make It Rhyme",
      definition:
        "A story told entirely in rhyming verses or poetry. The rhythmic and melodic quality makes it engaging, especially for younger audiences, enhancing memorability and enjoyment.",
    },
    {
      id: 2,
      title: "Educational Quest",
      definition:
        "Combines learning with adventure. The protagonist embarks on a journey that teaches them (and the reader) about a particular subject, moral lesson, or skill.",
    },
    {
      id: 3,
      title: "Hero's Journey",
      definition:
        "A classic narrative arc where the hero goes on an epic adventure, faces trials, receives aid, and returns home transformed. It includes elements like the call to adventure, mentors, challenges, and the return.",
    },
    {
      id: 4,
      title: "Problem-Solving Journey",
      definition:
        "The main character encounters a problem or challenge that needs resolution. The story focuses on the process of finding solutions, highlighting creativity, determination, and learning.",
    },
    {
      id: 5,
      title: "Magical Transformation",
      definition:
        "The protagonist undergoes a significant change, often through magical means. This transformation leads to new experiences, self-discovery, and personal growth.",
    },
    // Removed "Choose-Your-Own-Adventure"
    {
      id: 6,
      title: "Circular Narrative",
      definition:
        "The story ends where it began, often with a character learning a lesson.",
    },
    {
      id: 7,
      title: "Cumulative Tale",
      definition:
        "The story builds by adding on repeated elements, creating a rhythmic and predictable pattern that enhances engagement and memory.",
    },
    {
      id: 8,
      title: "Quest Structure",
      definition:
        "Characters embark on a journey to find something important, facing various challenges and adventures along the way.",
    },
    {
      id: 9,
      title: "Linear Adventure",
      definition:
        "A straightforward narrative where events happen in chronological order. The protagonist embarks on a journey, faces challenges, overcomes obstacles, and achieves a goal.",
    },
    {
      id: 10,
      title: "Mystery Unveiling",
      definition:
        "The protagonist seeks to solve a mystery or uncover secrets. The story builds suspense and curiosity, with clues leading to a surprising revelation.",
    },
    {
      id: 11,
      title: "Overcoming Fears",
      definition:
        "Focuses on the main character facing and conquering personal fears. It emphasizes courage, self-confidence, and emotional growth.",
    },
    {
      id: 12,
      title: "Friendship-Building Experience",
      definition:
        "The narrative centers around forming new friendships or strengthening existing ones. Characters learn the value of teamwork, trust, and understanding.",
    },
    {
      id: 13,
      title: "Friendship with Nature",
      definition:
        "The story emphasizes the relationship between the character and the natural world, promoting environmental awareness and appreciation.",
    },
    {
      id: 14,
      title: "Time Travel Adventure",
      definition:
        "Involves traveling to different times or eras, exploring historical events or future possibilities.",
    },
    {
      id: 15,
      title: "Festival or Celebration Tale",
      definition:
        "Centers around a special event or celebration, highlighting cultural traditions, community, and joy.",
    },
    {
      id: 16,
      title: "Silly and Humorous Escapades",
      definition:
        "A light-hearted story filled with jokes, funny situations, and playful characters, aiming to entertain and amuse.",
    },
    {
      id: 17,
      title: "Family Heritage Exploration",
      definition:
        "The protagonist learns about their family's history or cultural background, fostering a sense of identity and pride.",
    },
  ];
  