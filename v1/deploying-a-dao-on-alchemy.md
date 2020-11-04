# Deploying a DAO on Alchemy

**So you have an idea for a DAO? Or maybe you have a project or protocol that is looking to decentralize? Depending on your project, you might want to consider the steps below:**

1. [Designing your DAO](deploying-a-dao-on-alchemy.md#designing-your-dao)
2. [Choosing your network](deploying-a-dao-on-alchemy.md#choosing-your-network)
3. [Launching your DAO on Mainnet or xDAI](deploying-a-dao-on-alchemy.md#launching-a-dao-using-dao-creator)
4. [Post-launch community building efforts](deploying-a-dao-on-alchemy.md#post-launch-community-building-efforts)

### Designing your DAO

We highly recommend starting your journey by “designing” your DAO. DAOstack is more than happy to help you in this process \(contact us with [this form](https://docs.google.com/forms/d/e/1FAIpQLSedkvfFK1rsXcDUL3DCDcl5Wx1nOh2S0tb5P_xQdDlSjqsLZg/viewform) and we will get in touch\). Some of the questions you should typically ask yourself include:

* What problem is the DAO uniquely solving?
* How can one become a decision-maker in this DAO, and why would someone want to?
* How does one make decisions in this DAO, and what decisions get made? Why would someone participate in this process in good faith?
* If the DAO needs assets of any kind, how will it acquire them? Why would these assets be sent to the DAO? How / why would people withdraw assets from the DAO?
* What work does the DAO need to get done, and how would someone get assigned to this work? Why would they want to?

Answering these questions will help you execute on your vision, in a similar way a Business Plan helps traditional organizations succeed. In addition, it should help your project understand which Plugins you will need, as well as guide you in terms of deciding which network you should use \(mainnet, xdai, etc\). Before developing anything though, make sure you take a look at our [existing plugins](adding-plugins-to-your-dao/list-of-available-plugins.md)!

### Choosing your Network

Once you have a clear idea of what your DAO needs are, you can decide what network to launch on. Options include: 

* Launching on Mainnet, v1 at [v1.alchemy.do](https://v1.alchemy.do/)
* Launching on Mainnet, v2 at [alchemy.do](https://alchemy.do/)
* Launching on xDAI, v1 at [xdai.v1.alchemy.do](https://xdai.v1.alchemy.do/)
* Launching on xDAI, v2 at [xdai.alchemy.do](https://xdai.alchemy.do/)

### Launching a DAO using DAO Creator

DAOcreator is a tool that allows you to deploy your DAO in a super simple way. It has a UI which you can find in Alchemy. When you create a DAO, it creates an instance of the multiple components defined in Arc. 

The first step is to name your DAO, and choose a token symbol. Note that you don’t need to use this token if you don’t want to, but every DAO has a token. 

![](https://lh5.googleusercontent.com/ucRnL3rwluxXsqa6kWlEkIHAM-1JvmTFWFyDOnN-SS9mRgwed3BUnZXi7JVfXh4y0tai1XmNO0lat-KdTPOwZAepKv5qgoU2sb_88ov_CCap86f4-8MzVLLk4Oq4BWKoEZOa4lTg)

Next, you will need to define the parameters of your DAO. There are tool tips \(upon hover\) over the Fast, Medium, Slow buttons, as well as \(i\) icons for more information which should make things pretty straightforward. As always, contact us if you need any help, or play around on our testnet or xDAI before paying to deploy on mainnet. 

![](https://lh4.googleusercontent.com/_5Lel8pE0u3ZJzba9O7bw2TnvmGoHDS5ptGkJj5PuWXASzyqMMDja-UbSjFpmlA4hCTGtW7gsz1KSbFKGlca99ANUK_qWBTyoFjZnwyBtXa0EIztBU4Ti72uF3zx8xpIAksz4nir)

The advanced configuration allows you to configure the voting mechanics as you desire. Please refer to the explanation on [Holographic Consensus](architecture-and-holographic-consensus/holographic-consensus-explainer.md) to know what the parameters are and what they do. A common adjustment include changing the Threshold Constant to 1000 which ensures all proposals require the same ratio of stakes FOR and stakes AGAINST to get boosted \(a higher number leads to a dynamic threshold, which varies depending on the number of boosted proposals\). 

Once you are done with the parameters, you can set your founding DAO members. You can also import a CSV with the members if you have one, see [this sample spreadsheet](https://dorgtech.github.io/DAOstack-Hackers-Kit/assets/imports-test/members.csv) for reference.

You will be able to vote to add more members at a later date, so it is not critical if you miss anyone. Each member will be identified by their eth address, so make sure each one is inserted correctly. 

### Post-Launch Community Building Efforts

Once you launch your DAO, the hard part begins! Community building is no easy task, reach out if you need any support.  


