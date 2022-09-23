import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

export default function AboutBeer() {
  return (
    <div>

      <h2 className='about-beer-title'>Indecisive? Never picked up a beer? You're in the right place! Read this article!</h2>
      <p className='about-beer-general'>There's always something a little nerve-wracking about seeing a menu with too many options. Such can be the case when you visit a brewery with many drink options, but, hopefully, this article helps! Beer has been around a long time (5000 years), so there's been plenty of room to develop and create different textures and tastes for this classic drink!</p>
      
      <Accordion defaultActiveKey="0" className='accordion-beers'>

      <Accordion.Item eventKey="0">
        <Accordion.Header>Lagers</Accordion.Header>
        <Accordion.Body>
        Simply, the classic. Not too much to it in the form of alcoholic percentages or strong flavors you may be unaccustomed to. If, you are someone who likes to play it safe, pick a lager! If the person you're with sees you order one, they may have some questions. Better safe than sorry, right? Maybe, maybe not, but if you've seen the Coors Light commercials or actually tasted one then you know what a lager is.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>IPA</Accordion.Header>
        <Accordion.Body>
        Acronyms. There's always something suspicious and enticing lurking behind them (Governments love acronyms, like the USA Patriot Act!). Such is the case with the India Pale Ales here. Usually identifiable by their stronger tastes and higher alcohol percentages, these beers are likely to get you where you need to be sooner rather than later. Most IPA's use citrus and other fruit related flavors to provide a balance to the bitterness caused by strength of the beer itself. If you prefer something on the stronger side, or you're simply feeling adventurous, pick up an IPA!
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Pale Ale</Accordion.Header>
        <Accordion.Body>
        The nicer cousin of the IPA. Its name isn't as catchy, and frankly I prefer when things aren't pale. Nonetheless, it's a great choice for those looking for that malty drink without all the extra alcohol and bitterness an IPA brings. These, similar to lagers, are easier to drink relative to other beers and a good introduction into the world of beer!
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>Pilsner</Accordion.Header>
        <Accordion.Body>
        Not to be confused with the drink you can find in parts of Central America. This is typically a European style beer with a sharper taste. Depending on where you are or which part of Europe it is from, it can be very bitter. If you're a coffee person, stick to coffee.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="4">
        <Accordion.Header>Stouts</Accordion.Header>
        <Accordion.Body>
        Stouts. It may as well be what flows from Irish water faucets. Known for their distinct flavor, more on the sweet side if you are in Ireland. These beers will typically win in the competition of least bitter. Always a nice choice at the bar, don't be afraid to ask for a stout yourself!
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="5">
        <Accordion.Header>Porters</Accordion.Header>
        <Accordion.Body>
        Beer with chocolate. Mhmmmm. 
        No. Personally not one I would order. Especially if it you're not generally a beer drinker, but who knows? They are known for having more of a coffee-like taste, so if that is your preference, by all means!
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="6">
        <Accordion.Header>Belgian</Accordion.Header>
        <Accordion.Body>
        Belgium is one of those countries you feel does everything right. If only they had Swiss beer too... Naturally easy to drink with a good balance of alcohol bitterness and sweetness. Belgian beers are definitely a good go-to if you're looking to have a nice time drinking!
        </Accordion.Body>
      </Accordion.Item>

    </Accordion>
    </div>
  )
}
