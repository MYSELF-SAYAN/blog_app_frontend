interface blogProps {
    title: string;
    content: string;
    authorId: string;
    id: string;
    authorName: string;
    createdAt: string;
    imageUrl: string;
  }
  export type { blogProps };
  interface postProps {
    post:{
        title: string;
    content: string;
    authorId: string;
    id: string;
    authorName: string;
    createdAt: string;
    imageUrl: string;

    }
    
  }
    export type { postProps };