## Final Project

The final project for CSCI432 requires students to create a web-based platform that adapts Robert's Rules of Order (RONR) for digital use. Because RONR was initially intended for in-person meetings, students will introduce necessary variations to support both physical committee meetings and fully offline, asynchronous discussions. Working in groups of 2-4, each team will design their platform tailored to what needs the team wants to address. 

Groups need to be formed by 9/10. Please send an email to the instructor and the TA that includes the names of your group members. Once formed, groups cannot change. 

Here is a list of features that must be included. 

- User registration, login, and name change. Changing other properties, like short-bio, phone number, address, and profile picture, are optional.
- Creating a committee, adding users to a committee.
- Role control of users (e.g., owner, chair, member, and optionally observer). Fine-grained authentication control (e.g., create motion, discussion, move to vote, vote) is optional.
- Control panel for chairs to toggle some styles.
- Raise motion (title and description).
- Raise motions that decide to change the procedure (typically required 2/3 vote to pass).
- One or both of the feature
    - For offline discussion, motions can be replied to and discussed. Each reply should have a pro/con/neutral selection.
    - For in-person or video-conference discussions, members can raise their hands with a pro/con tag. The chair can decide who can speak, usually alternating between the pros and cons.
- Vote on motions (anonymously or with names recorded).
- Recording of previous decisions with the recording of the whole discussion and allowing the chair to write a summary of why the decision is made and the pros/cons of the decision for future reference.
- Raise motions that overturn previous decisions. Only the member who voted in favor of the vote can overturn previous decisions.
- Raise sub-motions, like revisions of the previous motion, and postpone the decision.
- Special motions that do not need or cannot be discussed.
- Proper documentation and prototyping of the website.

**The final project report** is due on 12/16/2024 at 5:00 pm. The final report should include the following content:

- Github repository. Mark the branches with the final code if the branch to be graded is not the default branch.
- A video that record a demo of your website. The video can be uploaded to YouTube and attach the link to the video in your report. The YouTube video can be unlisted so that others cannot watch it without the link.
- Team members and jobs completed by each member.
- Link to the website if it is publicly hosted.
- Walk through of the features of the website with screenshots.
- Backend API documentation for both HTTP API and websocket AI (if applicable).
- Data base structure, tables (columns) and relationships between tables.
