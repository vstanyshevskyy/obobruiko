---
title: Yale-Brown Obsessive Compulsive Scale (Y-BOCS)
showInLists: false
content:
  - path: /questionnaires/y-bocs
    questions:
      - subscale: default
        answers:
          - value: 0
            text: None
          - value: 1
            text: Less than 1 hr/day or occasional occurrence
          - value: 2
            text: 1 to 3 hrs/day or frequent
          - value: 3
            text: Greater than 3 and up to 8 hrs/day or very frequent occurrence
          - value: 4
            text: Greater than 8 hrs/day or nearly constant occurrence
        text: 1. How much of your time is occupied by obsessive thoughts?
      - subscale: default
        text: 2. How much do your obsessive thoughts interfere with your work, school,
          social, or other important role functioning? Is there anything that
          you don’t do because of them?
        answers:
          - value: 0
            text: None
          - value: 1
            text: Slight interference with social or other activities, but overall
              performance not impaired
          - value: 2
            text: Definite interference with social or occupational performance, but still
              manageable
          - value: 3
            text: Causes substantial impairment in social or occupational performance
          - value: 4
            text: Incapacitating
      - subscale: default
        text: 3. How much distress do your obsessive thoughts cause you?
        answers:
          - value: 0
            text: None
          - value: 1
            text: Not too disturbing
          - value: 2
            text: Disturbing, but still manageable
          - value: 3
            text: Very disturbing
          - value: 4
            text: Near constant and disabling distress
      - subscale: default
        text: 4. How much of an effort do you make to resist the obsessive thoughts? How
          often do you try to disregard or turn your attention away from these
          thoughts as they enter your mind?
        answers:
          - value: 0
            text: Try to resist all the time
          - value: 1
            text: Try to resist most of the time
          - value: 2
            text: Make some effort to resist
          - value: 3
            text: Yield to all obsessions without attempting to control them, but with some
              reluctance
          - value: 4
            text: Completely and willingly yield to all obsessions
      - subscale: default
        text: 5. How much control do you have over your obsessive thoughts? How successful
          are you in stopping or diverting your obsessive thinking? Can you
          dismiss them?
        answers:
          - value: 0
            text: Complete control
          - value: 1
            text: Usually able to stop or divert obsessions with some effort and
              concentration
          - value: 2
            text: Sometimes able to stop or divert obsessions
          - value: 3
            text: Rarely successful in stopping or dismissing obsessions, can only divert
              attention with difficulty
          - value: 4
            text: Obsessions are completely involuntary, rarely able to even momentarily
              alter obsessive thinking
      - subscale: default
        text: 6. How much time do you spend performing compulsive behaviors? How much
          longer than most people does it take to complete routine activities
          because of your rituals? How frequently do you do rituals?
        answers:
          - value: 0
            text: None
          - value: 1
            text: Less than 1 hr/day or occasional performance of compulsive behaviors
          - value: 2
            text: From 1 to 3 hrs/day, or frequent performance of compulsive behaviors
          - value: 3
            text: More than 3 and up to 8 hrs/day, or very frequent performance of
              compulsive behaviors
          - value: 4
            text: More than 8 hrs/day, or near constant performance of compulsive behaviors
              (too numerous to count)
      - subscale: default
        text: 7. How much do your compulsive behaviors interfere with your work, school,
          social, or other important role functioning? Is there anything that
          you don’t do because of the compulsions?
        answers:
          - value: 0
            text: None
          - value: 1
            text: Slight interference with social or other activities, but overall
              performance not impaired
          - value: 2
            text: Definite interference with social or occupational performance, but still
              manageable
          - value: 3
            text: Causes substantial impairment in social or occupational performance
          - value: 4
            text: Incapacitating
      - subscale: default
        text: 8. How would you feel if prevented from performing your compulsion(s)? How
          anxious would you become?
        answers:
          - value: 0
            text: None
          - value: 1
            text: Only slightly anxious if compulsions prevented
          - value: 2
            text: Anxiety would mount but remain manageable if compulsions prevented
          - value: 3
            text: Prominent and very disturbing increase in anxiety if compulsions
              interrupted
          - value: 4
            text: Incapacitating anxiety from any intervention aimed at modifying activity
      - subscale: default
        text: 9. How much of an effort do you make to resist the compulsions?
        answers:
          - value: 0
            text: Always try to resist
          - value: 1
            text: Try to resist most of the time
          - value: 2
            text: Make some effort to resist
          - value: 3
            text: Yield to almost all compulsions without attempting to control them, but
              with some reluctance
          - value: 4
            text: Completely and willingly yield to all compulsions
      - subscale: default
        text: 10. How strong is the drive to perform the compulsive behavior? How much
          control do you have over the compulsions?
        answers:
          - value: 0
            text: Complete control
          - value: 1
            text: Pressure to perform the behavior but usually able to exercise voluntary
              control over it
          - value: 2
            text: Strong pressure to perform behavior, can control it only with difficulty
          - value: 3
            text: Very strong drive to perform behavior, must be carried to completion, can
              only delay with difficulty
          - value: 4
            text: Drive to perform behavior experienced as completely involuntary and
              over-powering, rarely able to even momentarily delay activity.
    copyButtonText: Copy the results
    results:
      - text: Sub-clinical state
        minScore: 0
        maxScore: 7
      - text: Mild OCD
        minScore: 8
        maxScore: 15
      - text: Moderate OCD
        minScore: 16
        maxScore: 23
      - text: Severe OCD
        minScore: 24
        maxScore: 31
      - text: Extremely severe OCD
        minScore: 32
        maxScore: 40
    resultTemplate: |-
      Your results:

      {0}
    title: Yale-Brown Obsessive Compulsive Scale (Y-BOCS)
    language: EN
    copyResultsTemplate: |-
      {0}
      {1} - {2}
      {3}
    publishTime: 2025-05-17T11:07:00.000Z
    useWhiteForNav: false
    description: >-
      **Questions 1 to 5 are about your obsessive thoughts.**


      Obsessions are unwanted ideas, images or impulses that intrude on thinking against your wishes and efforts to resist them. They usually involve themes of harm, risk and danger. Common obsessions are excessive fears of contamination; recurring doubts about danger, extreme concern with order, symmetry, or exactness; fear of losing important things.


      **Questions 6 to 10 are about your compulsive behaviors.**


      Compulsions are urges that people have to do something to lessen feelings of anxiety or other discomfort. Often they do repetitive, purposeful, intentional behaviors called rituals. The behavior itself may seem appropriate but it becomes a ritual when done to excess. Washing, checking, repeating, straightening, hoarding and many other behaviors can be rituals. Some rituals are mental. For example, thinking or saying things over and over under your breath.
---
