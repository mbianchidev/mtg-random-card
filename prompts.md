1. Create a web application that takes a random magic the gathering card from this API:

https://api.magicthegathering.io/v1/cards/386616

Id is a random number between 1 and 90870

The webapp shows the image of the card, the text and information taken from the API response (english only)

There is only one button, right under the card, to get a new random card.
Style of the webapp must be modern and gaming-like.


2. Remove the background image from the body of the website, do only vanilla CSS to make the website look gaming-like.

Also, this is the card response from the API

{
  "card": {
    "name": "Narset, Enlightened Master",
    "manaCost": "{3}{U}{R}{W}",
    "cmc": 6,
    "colors": [
      "R",
      "U",
      "W"
    ],
    "colorIdentity": [
      "R",
      "U",
      "W"
    ],
    "type": "Legendary Creature — Human Monk",
    "supertypes": [
      "Legendary"
    ],
    "types": [
      "Creature"
    ],
    "subtypes": [
      "Human",
      "Monk"
    ],
    "rarity": "Mythic",
    "set": "KTK",
    "setName": "Khans of Tarkir",
    "text": "First strike, hexproof\nWhenever Narset, Enlightened Master attacks, exile the top four cards of your library. Until end of turn, you may cast noncreature spells from among those cards without paying their mana costs.",
    "artist": "Magali Villeneuve",
    "number": "190",
    "power": "3",
    "toughness": "2",
    "layout": "normal",
    "multiverseid": "386616",
    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386616&type=card",
    "watermark": "jeskai",
    "rulings": [
      {
        "date": "2014-09-20",
        "text": "Any exiled cards you don’t cast remain in exile."
      },
      {
        "date": "2014-09-20",
        "text": "Because you’re already casting the card using an alternative cost (by casting it without paying its mana cost), you can’t pay any other alternative costs for the card, including casting it face down using the morph ability. You can pay additional costs, such as kicker costs. If the card has any mandatory additional costs, you must pay those."
      },
      {
        "date": "2014-09-20",
        "text": "If the card has {X} in its mana cost, you must choose 0 as the value for X when casting it."
      },
      {
        "date": "2014-09-20",
        "text": "The cards are exiled face up. Casting the noncreature cards exiled this way follows the normal rules for casting those cards. You must follow all applicable timing rules. For example, if one of the exiled cards is a sorcery card, you can cast it only during your main phase while the stack is empty."
      },
      {
        "date": "2014-09-20",
        "text": "You can’t play any land cards exiled with Narset."
      }
    ],
    "foreignNames": [
      {
        "name": "Narset, Erleuchtete Meisterin",
        "text": "Erstschlag, Fluchsicher\nImmer wenn Narset, Erleuchtete Meisterin, angreift, schicke die obersten vier Karten deiner Bibliothek ins Exil. Bis zum Ende des Zuges kannst du Nichtkreatur-Karten wirken, die mit Narset in diesem Zug ins Exil geschickt wurden, ohne ihre Manakosten zu bezahlen.",
        "type": "Legendäre Kreatur — Mensch, Mönch",
        "flavor": null,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=387423&type=card",
        "language": "German",
        "identifiers": {
          "scryfallId": "69125086-2fc3-4894-b6f8-9a49d2596ee6",
          "multiverseId": 387423
        },
        "multiverseid": 387423
      },
      {
        "name": "Narset, maestra iluminada",
        "text": "Daña primero, antimaleficio.\nSiempre que Narset, maestra iluminada ataque, exilia las cuatro primeras cartas de tu biblioteca. Hasta el final del turno, puedes lanzar cartas que no sean de criatura exiliadas con Narset este turno sin pagar sus costes de maná.",
        "type": "Criatura legendaria — Monje humano",
        "flavor": null,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=389306&type=card",
        "language": "Spanish",
        "identifiers": {
          "scryfallId": "1ec19909-d143-495c-8810-e04a426342d2",
          "multiverseId": 389306
        },
        "multiverseid": 389306
      },
      {
        "name": "Narset, maîtresse éclairée",
        "text": "Initiative, défense talismanique\nÀ chaque fois que Narset, maîtresse éclairée attaque, exilez les quatre cartes du dessus de votre bibliothèque. Jusqu'à la fin du tour, vous pouvez lancez les cartes non-créature exilées par Narset ce tour-ci sans payer leur coût de mana.",
        "type": "Créature légendaire : humain et moine",
        "flavor": null,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=387692&type=card",
        "language": "French",
        "identifiers": {
          "scryfallId": "2f3e4b45-8236-4d24-a744-3e274404f929",
          "multiverseId": 387692
        },
        "multiverseid": 387692
      },
      {
        "name": "Narset, Maestra Illuminata",
        "text": "Attacco improvviso, anti-malocchio\nOgniqualvolta Narset, Maestra Illuminata attacca, esilia le prime quattro carte del tuo grimorio. Fino alla fine del turno, puoi lanciare carte non creatura esiliate con Narset in questo turno senza pagare il loro costo di mana.",
        "type": "Creatura Leggendaria — Monaco Umano",
        "flavor": null,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=387961&type=card",
        "language": "Italian",
        "identifiers": {
          "scryfallId": "b949e94c-6944-4424-b37e-5fe33d77163d",
          "multiverseId": 387961
        },
        "multiverseid": 387961
      },
      {
        "name": "悟った達人、ナーセット",
        "text": "先制攻撃、呪禁\n悟った達人、ナーセットが攻撃するたび、あなたのライブラリーの一番上から４枚のカードを追放する。ターン終了時まで、あなたはこのターンに悟った達人、ナーセットにより追放された、クリーチャーでないカードをそれのマナ・コストを支払うことなく唱えてもよい。",
        "type": "伝説のクリーチャー — 人間・モンク",
        "flavor": null,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=388230&type=card",
        "language": "Japanese",
        "identifiers": {
          "scryfallId": "596e68ed-c9da-4d13-bc32-587d0e0296e2",
          "multiverseId": 388230
        },
        "multiverseid": 388230
      },
      {
        "name": "깨달음을 얻은 대가 나르셋",
        "text": "선제공격, 방호\n깨달음을 얻은 대가 나르셋이 공격할 때마다, 당신의 서고 맨 위의 카드 네 장을 추방한다. 당신은 턴종료까지 나르셋이 이 턴에 추방한 카드 중 생물이 아닌 카드를 마나 비용을 지불하지 않고 발동할 수 있다.",
        "type": "전설적 생물 — 인간 승려",
        "flavor": null,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=388499&type=card",
        "language": "Korean",
        "identifiers": {
          "scryfallId": "f73420d6-8c0a-4126-8a0f-e7ae64c04c30",
          "multiverseId": 388499
        },
        "multiverseid": 388499
      },
      {
        "name": "Narset, Mestra Iluminada",
        "text": "Iniciativa, resistência a magia\nToda vez que Narset, Mestra Iluminada, atacar, exile os quatro cards do topo do seu grimório. Até o final do turno, você pode conjurar os cards que não sejam de criatura exilados por Narset neste turno sem pagar seus custos de mana.",
        "type": "Criatura Lendária — Humano Monge",
        "flavor": null,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=388768&type=card",
        "language": "Portuguese (Brazil)",
        "identifiers": {
          "scryfallId": "281dc778-3ff3-463c-9ad3-0b8e55f91afb",
          "multiverseId": 388768
        },
        "multiverseid": 388768
      },
      {
        "name": "Нарсет, Просветленная Наставница",
        "text": "Первый удар, Порчеустойчивость\nКаждый раз, когда Нарсет, Просветленная Наставница атакует, изгоните четыре верхние карты вашей библиотеки. До конца хода вы можете разыгрывать не являющиеся существами или землями карты, изгнанные Нарсет в этом ходу, без уплаты их мана-стоимости.",
        "type": "Легендарное Существо — Человек Монах",
        "flavor": null,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=389037&type=card",
        "language": "Russian",
        "identifiers": {
          "scryfallId": "a7d0add0-9093-4014-a4fb-6057dcc8e8f1",
          "multiverseId": 389037
        },
        "multiverseid": 389037
      },
      {
        "name": "悟道大师娜尔施",
        "text": "先攻，辟邪\n每当悟道大师娜尔施攻击时，放逐你牌库顶的四张牌。直到回合结束，你可以施放本回合中以娜尔施放逐的非生物牌，且不需支付其法术力费用。",
        "type": "传奇生物～人类／修行僧",
        "flavor": null,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386885&type=card",
        "language": "Chinese Simplified",
        "identifiers": {
          "scryfallId": "be4638d9-1fe9-451c-b6ea-384df6e2b1ba",
          "multiverseId": 386885
        },
        "multiverseid": 386885
      },
      {
        "name": "悟道大師娜爾施",
        "text": "先攻，辟邪\n每當悟道大師娜爾施攻擊時，放逐你牌庫頂的四張牌。直到回合結束，你可以施放本回合中以娜爾施放逐的非生物牌，且不需支付其魔法力費用。",
        "type": "傳奇生物～人類／修行僧",
        "flavor": null,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=387154&type=card",
        "language": "Chinese Traditional",
        "identifiers": {
          "scryfallId": "e2333d85-7ee8-4d05-ac99-78e84e957227",
          "multiverseId": 387154
        },
        "multiverseid": 387154
      }
    ],
    "printings": [
      "CMM",
      "KTK",
      "PKTK",
      "SLD"
    ],
    "originalText": "First strike, hexproof\nWhenever Narset, Enlightened Master attacks, exile the top four cards of your library. Until end of turn, you may cast noncreature cards exiled with Narset this turn without paying their mana costs.",
    "originalType": "Legendary Creature — Human Monk",
    "legalities": [
      {
        "format": "Brawl",
        "legality": "Legal"
      },
      {
        "format": "Commander",
        "legality": "Legal"
      },
      {
        "format": "Duel",
        "legality": "Legal"
      },
      {
        "format": "Explorer",
        "legality": "Legal"
      },
      {
        "format": "Gladiator",
        "legality": "Legal"
      },
      {
        "format": "Historic",
        "legality": "Legal"
      },
      {
        "format": "Legacy",
        "legality": "Legal"
      },
      {
        "format": "Modern",
        "legality": "Legal"
      },
      {
        "format": "Oathbreaker",
        "legality": "Legal"
      },
      {
        "format": "Penny",
        "legality": "Legal"
      },
      {
        "format": "Pioneer",
        "legality": "Legal"
      },
      {
        "format": "Timeless",
        "legality": "Legal"
      },
      {
        "format": "Vintage",
        "legality": "Legal"
      }
    ],
    "id": "15e45fe0-92ea-52dc-8665-7105ac30db70"
  }
}

3. Continue looking for a card if the error is 404 not found

4. Fix the image section, until an image is not loaded either hide the image element or use a placeholder.
You can also add a loader instead if you want, since you might take a while to look for the card.

5. Make sure that when you switch between cards, the old card gets subsituted by the placeholder or loader, and then the new card is shown.

-- todo --
6. Add the setName and set in parentesis [e.g. Wilds of Eldrain (WoE)] to the card information.
Add rarity to the card information.
Also add legality and rulings to the card information.