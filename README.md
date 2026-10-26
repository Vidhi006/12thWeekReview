Ques1:
Build ScrollableNotesWithModal that uses Fragment for list, Render Props MouseTracker for coordinates,
useRef to focus and scroll, Portal for delete modal, Profiler wrapper.

Ques2:
Implement Reusable Search and Filtering Using Render PropsScenario
The Fundoo Notes application has several sections:
All Notes
Archived Notes
Shared Notes
Label-specific Notes
Each section needs similar search functionality. The development team does not want to duplicate the search logic in every component.
Your task is to implement a reusable search component using the Render Props pattern.
Requirements
Create a reusable component that receives notes.
Provide a search input.
Pass filtered notes to a rendering function.
Reuse the same component for different note views.
Display a message when no matching notes exist.
