   async function deckOfCardsDemo() {
      try {
        // 2.1 New Deck
        const deckRes = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
        const deckId = deckRes.data.deck_id;
        console.log("New Deck ID:", deckId);

        // 2.2 Draw One Card
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        console.log("Single Card:", res.data.cards[0].value, "of", res.data.cards[0].suit);

        // 2.3 Draw Five Cards
        res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`);
        console.log("Five Cards:");
        res.data.cards.forEach(c => console.log(c.value, "of", c.suit));

        // 2.4 Shuffle + Draw Two
        await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
        console.log("After Shuffle, Two Cards:");
        res.data.cards.forEach(c => console.log(c.value, "of", c.suit));

        // 2.5 Stretch: Hands for 4 players
        async function drawCards(deckId, count) {
          const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
          return res.data.cards;
        }

        console.log("Hands for 4 players:");
        for (let i = 1; i <= 4; i++) {
          const hand = await drawCards(deckId, 5);
          console.log(`Player ${i}:`, hand.map(c => `${c.value} of ${c.suit}`).join(", "));
        }

      } catch (err) {
        console.error("Error with Deck of Cards API:", err);
      }
    }

    // -------------------------
    // Run the demos
    // -------------------------

   // getRandomJoke();
    //getTenJokes();
   // getProgrammingJokes();
   // getFourRandomJokes();
   //logFiveJokes();
    deckOfCardsDemo();