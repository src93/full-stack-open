export interface HeaderProps {
  courseName: string;
}

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: CoursePart[];
}

export interface TotalProps {
  courseParts: CoursePart[];
}